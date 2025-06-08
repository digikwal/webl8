// ./src/lib/api.js
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
  
export async function getSourceStrings({ token, component }) {
  try {
    const res = await fetch(`https://hosted.weblate.org/api/components/${component}/units/?q=translated=no`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (!res.ok) {
      return { data: null, error: `Weblate error: ${res.status}` };
    }

    const raw = await res.json();

    // Clean output: keep only relevant fields
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
  
export async function translateStringsViaAI({ sourceLang, targetLang, strings }) {
  try {
    const translations = await Promise.all(
      strings.map(async (item) => {
        const prompt = `Translate the following from ${sourceLang} to ${targetLang}:\n\n"${item.source}"`;

        // 🔐 Replace this with real OpenAI/HuggingFace call
        const response = await fetch('https://api.example.com/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.AI_API_KEY}` // Never exposed client-side
          },
          body: JSON.stringify({ prompt })
        });

        const json = await response.json();

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

export async function pushTranslationsToWeblate({ token, component, translations }) {
  try {
    const results = [];

    for (const t of translations) {
      const body = JSON.stringify({ translation: t.translation });

      const res = await fetch(`https://hosted.weblate.org/api/units/${t.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });

      if (!res.ok) {
        return { data: null, error: `Failed on unit ${t.id}: ${res.status}` };
      }

      const data = await res.json();
      results.push(data);
    }

    return { data: results, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
