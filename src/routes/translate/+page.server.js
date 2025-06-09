// ./src/routes/translate/+page.server.js
import { redirect } from '@sveltejs/kit';
import { translateStringsViaAI } from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
  const token = cookies.get('token');
  const sourceLang = cookies.get('sourceLang');
  const targetLang = cookies.get('targetLang');
  const sourceStrings = cookies.get('sourceStrings');

  if (!token || !sourceLang || !targetLang || !sourceStrings) {
    throw redirect(302, '/setup');
  }

  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();

    const sourceLang = form.get('sourceLang')?.toString();
    const targetLang = form.get('targetLang')?.toString();
    const stringsRaw = form.get('strings');

    if (!sourceLang || !targetLang || !stringsRaw) {
      return { success: false, error: 'Missing required data.' };
    }

    let strings;
    try {
      strings = JSON.parse(stringsRaw.toString());
      if (!Array.isArray(strings)) {
        throw new Error('Invalid strings format');
      }
    } catch (err) {
      return { success: false, error: 'Invalid JSON input for strings.' };
    }

    const { data, error } = await translateStringsViaAI({ sourceLang, targetLang, strings });

    if (error) {
      return { success: false, error };
    }

    return { success: true, data };
  }
};
