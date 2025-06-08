<script>
  import SettingsForm from './components/SettingsForm.svelte';
  import TranslationList from './components/TranslationList.svelte';
  import { darkMode } from './stores.js';

  let translationListRef;

  function handleFetch() {
    translationListRef?.loadStrings();
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

  <main>
    <section class="form-section">
      <SettingsForm onFetch={handleFetch} />
    </section>

    <section class="translations">
      <TranslationList bind:this={translationListRef} />
    </section>
  </main>
</div>