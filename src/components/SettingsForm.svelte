<script>
  import {
    baseUrl, token, project, component,
    sourceLang, targetLang, loading, darkMode,
    saveToLocalStorage
  } from '../stores.js';

  export let onFetch;
  export let onToggleTheme;

  let langs = [];
  let error = '';

  // Haal beschikbare talen op van Weblate
  $: if ($baseUrl && $token && $project && $component) {
    fetchLanguages();
  }

  async function fetchLanguages() {
    try {
      const response = await fetch(
        `${$baseUrl}/translations/${$project}/${$component}/`,
        {
          headers: {
            Authorization: `Token ${$token}`
          }
        }
      );
      const data = await response.json();
      langs = Array.from(new Set(data.map(item => item.language_code))).sort();
    } catch (err) {
      langs = [];
      console.error("Failed to fetch languages:", err);
    }
  }

  function save() {
    if (!$baseUrl || !$token || !$project || !$component || !$sourceLang || !$targetLang) {
      error = 'Please fill in all fields.';
      return;
    }
    error = '';
    saveToLocalStorage();
    onFetch();
  }
</script>

<div>
  <button on:click={onToggleTheme}>
    {$darkMode ? 'Light Mode' : 'Dark Mode'}
  </button>

  <h1>Webl8 – Weblate Translator</h1>

  {#if error}
    <div style="color: red; margin-bottom: 1rem;">{error}</div>
  {/if}

  <label>Weblate API URL</label>
  <input bind:value={$baseUrl} placeholder="https://translate.example.com/api" />

  <label>API Token</label>
  <input bind:value={$token} placeholder="API Token" type="password" />

  <label>Project</label>
  <input bind:value={$project} placeholder="project-name" />

  <label>Component</label>
  <input bind:value={$component} placeholder="component-name" />

  <label>Source language</label>
  <select bind:value={$sourceLang}>
    <option value="" disabled>Select source language</option>
    {#each langs as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>

  <label>Target language</label>
  <select bind:value={$targetLang}>
    <option value="" disabled>Select target language</option>
    {#each langs as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>

  <button on:click={save} disabled={$loading}>
    {#if $loading}Loading...{/if}
    {#if !$loading}Fetch untranslated strings{/if}
  </button>
</div>

<style>
  label {
    font-weight: bold;
    margin-top: 1rem;
    display: block;
  }

  input, select, button {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
</style>
