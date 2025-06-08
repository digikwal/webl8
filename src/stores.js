import { writable } from 'svelte/store';

/**
 * Persistent store with localStorage sync and fallback mechanism
 */
function persistentStore(key, initial) {
  let stored;
  let isLocalStorageAvailable = true;

  try {
    stored = localStorage.getItem(key);
  } catch (error) {
    console.warn(`localStorage unavailable for key "${key}":`, error);
    stored = null; // Fallback if localStorage is unavailable
    isLocalStorageAvailable = false;
  }

  const store = writable(stored ?? initial);

  store.subscribe(value => {
    if (isLocalStorageAvailable) {
      try {
        if (value !== undefined && value !== null) {
          localStorage.setItem(key, value);
        }
      } catch (error) {
        console.error(`Failed to save "${key}" to localStorage:`, error);
        isLocalStorageAvailable = false; // Disable further localStorage attempts
      }
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