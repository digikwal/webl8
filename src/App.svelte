<script>
  import SettingsForm from './components/SettingsForm.svelte';
  import TranslationList from './components/TranslationList.svelte';
  import { fetchStrings } from './lib/api.js';

  import {
    baseUrl, token, project, component,
    targetLang, results, loading, darkMode
  } from './stores.js';

  let fetchError = '';

  async function getStrings() {
    loading.set(true);
    fetchError = '';
    try {
      const res = await fetchStrings({
        baseUrl: $baseUrl,
        token: $token,
        project: $project,
        component: $component,
        targetLang: $targetLang
      });
      results.set(res);
      if (!res.length) {
        fetchError = 'No untranslated strings found.';
      }
    } catch (err) {
      fetchError = 'Failed to fetch strings.';
      console.error(err);
      results.set([]);
    } finally {
      loading.set(false);
    }
  }

  function toggleTheme() {
    darkMode.update(v => !v);
  }
</script>

<div class={`app ${$darkMode ? 'dark' : 'light'}`}>
  <header>
    <h1>🌐 Webl8 Translator</h1>
    <button class="theme-toggle" on:click={toggleTheme}>
      {$darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  </header>

  <section class="form-section">
    <SettingsForm onFetch={getStrings} />
  </section>

  {#if fetchError}
    <div class="error">{fetchError}</div>
  {/if}

  <section class="translations">
    <TranslationList />
  </section>
</div>
