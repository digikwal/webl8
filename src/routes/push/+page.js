// ./src/routes/push/+page.js
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { acceptedTranslations } from '$lib/stores.js';

export function load() {
  if (get(acceptedTranslations).length === 0) {
    throw redirect(302, '/review');
  }
}
