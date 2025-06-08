// ./src/routes/fetch/+server.js
import { getSourceStrings } from '$lib/api.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get('token');
    const component = form.get('component');

    if (!token || !component) {
      return { success: false, error: 'Missing token or component.' };
    }

    const { data, error } = await getSourceStrings({ token, component });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  },
};
