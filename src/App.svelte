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
