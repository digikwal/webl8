// ./src/routes/setup/+server.js
import { fetchWeblateProject } from '$lib/api.js';
import { json, error as svelteError } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    try {
      const form = await request.formData();
      const token = form.get('token');
      const project = form.get('project');

      if (!token || !project) {
        return json({ success: false, error: 'Missing token or project.' }, { status: 400 });
      }

      const { data, error: apiError } = await fetchWeblateProject({ token, project });

      if (apiError || !data) {
        return json({ success: false, error: apiError || 'Weblate API error.' }, { status: 502 });
      }

      return json({
        success: true,
        data: {
          name: data.name,
          slug: data.slug,
          source_lang: data.source_language,
          target_langs: data.translations.map((t) => t.language_code),
        },
      });
    } catch (err) {
      throw svelteError(500, `Internal error: ${err.message}`);
    }
  },
};
