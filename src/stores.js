import { writable } from 'svelte/store';

/**
 * Creates a writable store synchronized with localStorage.
 * Automatically falls back if localStorage is unavailable.
 */
function persistentStore(key, initialValue) {
  let localStorageAvailable = true;

  function load() {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : initialValue;
    } catch (err) {
      console.warn(`⚠️ Unable to access localStorage key "${key}":`, err);
      localStorageAvailable = false;
      return initialValue;
    }
  }

  const store = writable(load());

  store.subscribe(value => {
    if (!localStorageAvailable) return;
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(`❌ Failed to persist key "${key}":`, err);
      localStorageAvailable = false;
    }
  });

  return store;
}

// 🧊 Persistent settings (auto-loaded and saved)
export const baseUrl     = persistentStore('baseUrl', '');
export const token       = persistentStore('token', '');
export const project     = persistentStore('project', '');
export const component   = persistentStore('component', '');
export const sourceLang  = persistentStore('sourceLang', '');
export const targetLang  = persistentStore('targetLang', '');

// 🌈 UI-only volatile state
export const darkMode = writable(false);
export const loading  = writable(false);
export const results  = writable([]);

/**
 * Manually save a raw value to localStorage (useful outside of Svelte stores).
 */
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error(`❌ Manual save failed for "${key}":`, err);
  }
}
