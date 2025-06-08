import { writable } from 'svelte/store';

/**
 * Create a writable store synced with localStorage, with fallback for restricted environments.
 */
function persistentStore(key, initial) {
  let isLocalStorageAvailable = true;

  const read = () => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : initial;
    } catch (err) {
      console.warn(`⚠️ Cannot read localStorage key "${key}":`, err);
      isLocalStorageAvailable = false;
      return initial;
    }
  };

  const store = writable(read());

  store.subscribe(value => {
    if (!isLocalStorageAvailable) return;
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(`❌ Failed to write "${key}" to localStorage:`, err);
      isLocalStorageAvailable = false;
    }
  });

  return store;
}

// Persistent Weblate settings
export const baseUrl     = persistentStore('baseUrl', '');
export const token       = persistentStore('token', '');
export const project     = persistentStore('project', '');
export const component   = persistentStore('component', '');
export const sourceLang  = persistentStore('sourceLang', '');
export const targetLang  = persistentStore('targetLang', '');

// UI-only runtime state
export const darkMode = writable(false);
export const loading  = writable(false);
export const results  = writable([]);

/**
 * Utility to manually write to localStorage (not linked to a store)
 */
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(`❌ Failed to save "${key}" manually:`, err);
  }
}
