<script>
  import SettingsForm from './components/SettingsForm.svelte';
  import TranslationList from './components/TranslationList.svelte';
  import { fetchStrings } from './lib/api.js';

  import {
    baseUrl, token, project, component,
    targetLang, results, loading, darkMode
  } from './stores.js';

  let fetchError = '';

  // Fetch untranslated strings using current store values
  async function getStrings() {
    fetchError = '';
    loading.set(true);

    console.log('Fetching strings with parameters:', {
      baseUrl: $baseUrl,
      token: $token,
      project: $project,
      component: $component,
      targetLang: $targetLang
    });

    const { data, error } = await fetchStrings({
      baseUrl: $baseUrl,
      token: $token,
      project: $project,
      component: $component,
      targetLang: $targetLang
    });

    console.log('Fetch result:', { data, error });

    if (error) {
      fetchError = error;
      results.set([]);
      console.error('Fetch error:', error);
    } else {
      results.set(data);
      console.log('Results updated:', data);
      if (data.length === 0) {
        fetchError = 'No untranslated strings found.';
        console.warn(fetchError);
      }
    }

    loading.set(false);
    console.log('Loading state set to false');
  }

  function toggleTheme() {
    console.log('Toggling theme. Current mode:', $darkMode ? 'dark' : 'light');
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

  <main>
    <section class="form-section">
      <SettingsForm onFetch={getStrings} />
    </section>

    {#if fetchError}
      <div class="error">{fetchError}</div>
    {/if}

    <section class="translations">
      <TranslationList />
    </section>
  </main>
</div>