// ./src/routes/translate/+page.server.js
import { redirect } from '@sveltejs/kit';

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
