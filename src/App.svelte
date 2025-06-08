<script>
  import SettingsForm from './components/SettingsForm.svelte';
  import TranslationList from './components/TranslationList.svelte';
  import { fetchStrings } from './lib/api.js';

  import {
    baseUrl, token, project, component,
    targetLang, results, loading, darkMode
  } from './stores.js';

  async function getStrings() {
    loading.set(true);
    try {
      const res = await fetchStrings({
        baseUrl: $baseUrl,
        token: $token,
        project: $project,
        component: $component,
        targetLang: $targetLang
      });
      results.set(res);
    } catch (err) {
      console.error("Failed to fetch strings:", err);
      results.set([]);
    } finally {
      loading.set(false);
    }
  }

  function toggleTheme() {
    darkMode.update(v => !v);
  }
</script>

<div class={$darkMode ? 'dark' : 'light'}>
  <SettingsForm onFetch={getStrings} onToggleTheme={toggleTheme} />
  <TranslationList />
</div>

<style>
  :global(body) {
    font-family: sans-serif;
    margin: 2rem;
    background: var(--bg);
    color: var(--text);
  }

  input, textarea, select {
    width: 100%;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .dark {
    --bg: #121212;
    --text: #eee;
  }

  .light {
    --bg: #fff;
    --text: #000;
  }
</style>
