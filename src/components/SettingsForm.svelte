<script>
  import {
    baseUrl, token, project, component,
    sourceLang, targetLang, loading, darkMode
  } from '../stores.js';

  export let onFetch;
  export let onToggleTheme;

  let langs = [];
  let error = '';
  let debounceTimeout;

  // Debounced fetchLanguages function
  $: if ($baseUrl && $token && $project && $component) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      fetchLanguages();
    }, 300); // Adjust debounce delay as needed
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

      if (!response.ok) {
        const errData = await response.json();
        console.error("Weblate API error:", errData);
        error = `API Error: ${errData.detail || "Failed to fetch languages."}`;
        langs = [];
        return;
      }

      const data = await response.json();

      // Validate response format
      if (!data || !Array.isArray(data) || data.some(item => !item.language_code)) {
        console.error("Unexpected API response format:", data);
        error = "Unexpected API response format. Please check the Weblate API.";
        langs = [];
        return;
      }

      langs = Array.from(new Set(data.map(item => item.language_code))).sort();
      error = ''; // Clear error if successful
    } catch (err) {
      console.error("Network error:", err);
      error = `Network Error: ${err.message}`;
      langs = [];
    }
  }

  function save() {
    console.log("Save button clicked");
    if (onFetch) {
      onFetch(); // Call the external function passed via the prop
    }
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

  <label for="baseUrl">Weblate API URL</label>
  <input id="baseUrl" bind:value={$baseUrl} placeholder="https://translate.example.com/api" />

  <label for="apiToken">API Token</label>
  <input id="apiToken" bind:value={$token} placeholder="API Token" type="password" />

  <label for="project">Project</label>
  <input id="project" bind:value={$project} placeholder="project-name" />

  <label for="component">Component</label>
  <input id="component" bind:value={$component} placeholder="component-name" />

  <label for="sourceLang">Source language</label>
  <select id="sourceLang" bind:value={$sourceLang}>
    <option value="" disabled>Select source language</option>
    {#each langs as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>

  <label for="targetLang">Target language</label>
  <select id="targetLang" bind:value={$targetLang}>
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