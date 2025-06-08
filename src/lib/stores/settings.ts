import { writable, derived } from 'svelte/store';
import type { Readable } from 'svelte/store';

export interface Settings {
  apiToken: string;
  sourceLang: string;
  targetLang: string;
  selectedProject: string;
}

export const settings = writable<Settings>({
  apiToken: '',
  sourceLang: 'en',
  targetLang: 'nl',
  selectedProject: ''
});

// Generic typed selector for derived stores
function select<K extends keyof Settings>(key: K): Readable<Settings[K]> {
  return derived(settings, ($s) => $s[key]);
}

// Expose individual fields
export const apiToken = select('apiToken');
export const sourceLang = select('sourceLang');
export const targetLang = select('targetLang');
export const selectedProject = select('selectedProject');
