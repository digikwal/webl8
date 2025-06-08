// ./src/routes/push/+server.js
import { pushTranslationsToWeblate } from '$lib/api.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get('token');
    const component = form.get('component');
    const accepted = form.get('accepted');

    if (!token || !component || !accepted) {
      return { success: false, error: 'Missing data.' };
    }

    const translations = JSON.parse(accepted);

    const { data, error } = await pushTranslationsToWeblate({ token, component, translations });

    if (error) {
      return { success: false, error };
    }

    return { success: true, count: data.length };
  }
};
