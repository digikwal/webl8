// ./src/routes/translate/+server.js
import { translateStringsViaAI } from '$lib/api.js';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const sourceLang = form.get('sourceLang');
    const targetLang = form.get('targetLang');
    const stringsRaw = form.get('strings');

    if (!sourceLang || !targetLang || !stringsRaw) {
      return { success: false, error: 'Missing required data.' };
    }

    const strings = JSON.parse(stringsRaw);

    const { data, error } = await translateStringsViaAI({ sourceLang, targetLang, strings });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  },
};
