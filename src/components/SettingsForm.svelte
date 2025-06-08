<script>
  import { onDestroy } from 'svelte';
  import {
    baseUrl, token, project, component,
    sourceLang, targetLang, loading, darkMode
  } from '../stores.js';

  export let onFetch = () => {};
  export let onToggleTheme = () => {};

  let langs = [];
  let error = '';
  let debounceTimeout;

  // Debounced effect for API call
  $: if ($baseUrl && $token && $project && $component) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(fetchLanguages, 300);
  }

  onDestroy(() => {
    clearTimeout(debounceTimeout);
  });

  async function fetchLanguages() {
    try {
      const url = `${$baseUrl}/translations/${$project}/${$component}/`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Token ${$token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch languages.');

      if (!Array.isArray(data)) throw new Error('Unexpected API response format.');

      langs = [...new Set(data.map(item => item.language_code))].sort();
      error = '';
    } catch (err) {
      console.error("Fetch error:", err);
      langs = [];
      error = `⚠ ${err.message || 'Unknown error.'}`;
    }
  }

  function save() {
    if (!langs.length) {
      error = 'No languages loaded. Check API, project, or component.';
      return;
    }
    if (!$sourceLang || !$targetLang) {
      error = 'Please select both source and target languages.';
      return;
    }
    error = '';
    onFetch();
  }
</script>

<div>
  <button on:click={onToggleTheme}>
    {$darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
  </button>

  <h1>🌐 Webl8 – Weblate Translator</h1>

  {#if error}
    <div style="color: red; margin-bottom: 1rem;">{error}</div>
  {/if}

  <label for="baseUrl">Weblate API URL</label>
  <input id="baseUrl" bind:value={$baseUrl} placeholder="https://translate.example.com/api" />

  <label for="apiToken">API Token</label>
  <input id="apiToken" type="password" bind:value={$token} placeholder="API Token" />

  <label for="project">Project</label>
  <input id="project" bind:value={$project} placeholder="project-name" />

  <label for="component">Component</label>
  <input id="component" bind:value={$component} placeholder="component-name" />

  {#if langs.length > 0}
    <label for="sourceLang">Source language</label>
    <select id="sourceLang" bind:value={$sourceLang}>
      <option value="" disabled selected>Select source language</option>
      {#each langs as lang}
        <option value={lang}>{lang}</option>
      {/each}
    </select>

    <label for="targetLang">Target language</label>
    <select id="targetLang" bind:value={$targetLang}>
      <option value="" disabled selected>Select target language</option>
      {#each langs as lang}
        <option value={lang}>{lang}</option>
      {/each}
    </select>
  {/if}

  <button on:click={save} disabled={$loading}>
    {#if $loading}Loading...{/if}
    {#if !$loading}Fetch untranslated strings{/if}
  </button>
</div>
