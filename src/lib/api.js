// ./src/lib/api.js
import { get } from 'svelte/store';
import { aiKey } from '$lib/stores.js';

// --[1]-- Fetch Weblate project metadata
export async function fetchWeblateProject({ token, project }) {
  try {
    const res = await fetch(`https://hosted.weblate.org/api/projects/${project}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (!res.ok) {
      return { data: null, error: `Weblate error: ${res.status}` };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// --[2]-- Fetch untranslated source strings
export async function getSourceStrings({ token, component }) {
  try {
    const res = await fetch(
      `https://hosted.weblate.org/api/components/${component}/units/?q=translated=no`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    if (!res.ok) {
      return { data: null, error: `Weblate error: ${res.status}` };
    }

    const raw = await res.json();

    const strings = raw.results.map((unit) => ({
      id: unit.id,
      source: unit.source,
      context: unit.context,
      location: unit.location
    }));

    return { data: strings, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// --[3]-- Translate via external AI API (user-provided key)
export async function translateStringsViaAI({ sourceLang, targetLang, strings }) {
  const apiKey = get(aiKey);
  if (!apiKey) return { data: null, error: 'Missing AI API key' };

  try {
    const translations = await Promise.all(
      strings.map(async (item) => {
        const prompt = `Translate the following from ${sourceLang} to ${targetLang}:\n\n"${item.source}"`;

        const res = await fetch('https://api.example.com/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({ prompt })
        });

        const json = await res.json();

        return {
          id: item.id,
          source: item.source,
          translation: json.translation || '(untranslated)'
        };
      })
    );

    return { data: translations, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// --[4]-- Push translations back to Weblate
export async function pushTranslationsToWeblate({ token, translations }) {
  try {
    const results = [];

    for (const t of translations) {
      const res = await fetch(`https://hosted.weblate.org/api/units/${t.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ translation: t.translation })
      });

      if (!res.ok) {
        return { data: null, error: `Failed on unit ${t.id}: ${res.status}` };
      }

      const json = await res.json();
      results.push(json);
    }

    return { data: results, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
