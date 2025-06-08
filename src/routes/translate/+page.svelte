<script>
    import { sourceStrings, proposedTranslations, sourceLang, targetLang } from '$lib/stores.js';
    import { get } from 'svelte/store';
  
    let preview = [];
    let error = '';
    let translated = false;
    let loading = false;
  
    async function handleTranslate() {
      error = '';
      translated = false;
      loading = true;
  
      const formData = new FormData();
      formData.append('sourceLang', get(sourceLang));
      formData.append('targetLang', get(targetLang));
      formData.append('strings', JSON.stringify(get(sourceStrings)));
  
      const res = await fetch('/translate', {
        method: 'POST',
        body: formData
      });
  
      const result = await res.json();
      loading = false;
  
      if (result.success) {
        proposedTranslations.set(result.data);
        preview = result.data.slice(0, 5);
        translated = true;
      } else {
        error = result.error || 'Failed to translate.';
      }
    }
  </script>
  
  <button on:click={handleTranslate} disabled={loading}>
    {#if loading}Translating...{else}Translate via AI{/if}
  </button>
  
  {#if error}
    <p class="form__error">{error}</p>
  {/if}
  
  {#if translated}
    <h3>Preview of Translations</h3>
    <ul>
      {#each preview as item}
        <li>
          <code>{item.source}</code><br />
          → <strong>{item.translation}</strong>
        </li>
      {/each}
    </ul>
  {/if}
  
  <style>
    .form__error {
      color: red;
      font-size: 0.9em;
    }
  </style>
  