// ./src/stores.js
import { writable } from 'svelte/store';

function persist(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const store = writable(initial);

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}

export const token = persist('token', '');
export const project = persist('project', '');
export const sourceLang = persist('sourceLang', '');
export const targetLang = persist('targetLang', '');

export const availableSources = writable([]);
export const availableTargets = writable([]);

export const selectedComponent = persist('selectedComponent', '');
export const sourceStrings = persist('sourceStrings', []);
export const proposedTranslations = persist('proposedTranslations', []);
export const acceptedTranslations = persist('acceptedTranslations', []);
