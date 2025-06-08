// ./src/routes/review/+page.js
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { proposedTranslations } from '$lib/stores.js';

export function load() {
  if (get(proposedTranslations).length === 0) {
    throw redirect(302, '/translate');
  }
}
