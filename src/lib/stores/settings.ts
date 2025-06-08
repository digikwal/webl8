import { writable, derived, Readable } from 'svelte/store';

export interface Settings {
  apiToken: string;
  sourceLang: string;
  targetLang: string;
  selectedProject: string;
}

const defaultSettings: Settings = {
  apiToken: '',
  sourceLang: 'en',
  targetLang: 'nl',
  selectedProject: ''
};

export const settings = writable<Settings>({ ...defaultSettings });

// Generic selector for derived store keys
function select<K extends keyof Settings>(key: K): Readable<Settings[K]> {
  return derived<Settings, Settings[K]>(settings, ($s) => $s[key]);
}

// Export derived individual fields
export const apiToken = select('apiToken');
export const sourceLang = select('sourceLang');
export const targetLang = select('targetLang');
export const selectedProject = select('selectedProject');
