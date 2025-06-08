// ./src/routes/setup/+server.js
import { fetchWeblateProject } from '$lib/api.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get('token');
    const project = form.get('project');

    if (!token || !project) {
      return { success: false, error: 'Missing fields.' };
    }

    const { data, error } = await fetchWeblateProject({ token, project });

    if (error) {
      return { success: false, error };
    }

    return {
      success: true,
      data: {
        name: data.name,
        slug: data.slug,
        source_lang: data.source_language,
        target_langs: data.translations.map(t => t.language_code)
      }
    };
  }
};
