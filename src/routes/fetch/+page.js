// ./src/routes/fetch/+page.js
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { token, project, sourceLang, targetLang } from '$lib/stores.js';

export function load() {
  if (!get(token) || !get(project) || !get(sourceLang) || !get(targetLang)) {
    throw redirect(302, '/setup');
  }
}
