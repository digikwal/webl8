// ./src/stores.js
import { writable } from 'svelte/store';

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function persist(key, defaultValue) {
  const initial = isBrowser()
    ? (JSON.parse(localStorage.getItem(key) ?? 'null') ?? defaultValue)
    : defaultValue;

  const store = writable(initial);

  if (isBrowser()) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}

// Persistent stores
export const token = persist('token', '');
export const project = persist('project', '');
export const sourceLang = persist('sourceLang', '');
export const targetLang = persist('targetLang', '');
export const selectedComponent = persist('selectedComponent', '');
export const sourceStrings = persist('sourceStrings', []);
export const proposedTranslations = persist('proposedTranslations', []);
export const acceptedTranslations = persist('acceptedTranslations', []);
export const aiKey = persist('aiKey', '');

// Session/volatile stores
export const availableSources = writable([]);
export const availableTargets = writable([]);
