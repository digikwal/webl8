import { writable } from 'svelte/store';

/**
 * Persistent store with localStorage sync
 */
function persistentStore(key, initial) {
  const stored = localStorage.getItem(key);
  const store = writable(stored ?? initial);

  store.subscribe(value => {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, value);
    }
  });

  return store;
}

// Persistent fields
export const baseUrl     = persistentStore('baseUrl', '');
export const token       = persistentStore('token', '');
export const project     = persistentStore('project', '');
export const component   = persistentStore('component', '');
export const sourceLang  = persistentStore('sourceLang', '');
export const targetLang  = persistentStore('targetLang', '');

// UI-only (non-persistent) state
export const darkMode = writable(false);
export const loading  = writable(false);
export const results  = writable([]);
