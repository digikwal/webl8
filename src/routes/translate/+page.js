// ./src/routes/translate/+page.js
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { token, sourceLang, targetLang, sourceStrings } from '$lib/stores.js';

export function load() {
  if (!get(token) || !get(sourceLang) || !get(targetLang) || get(sourceStrings).length === 0) {
    throw redirect(302, '/setup');
  }
}
