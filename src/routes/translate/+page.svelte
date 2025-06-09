<!-- src/routes/translate/+page.svelte -->
<script>
  import { get } from 'svelte/store';
  import { sourceStrings, proposedTranslations, sourceLang, targetLang } from '$lib/stores.js';

  let preview = [];
  let error = '';
  let loading = false;

  // Reactive derived value instead van get()
  $: canTranslate = $sourceStrings.length > 0;

  async function handleTranslate() {
    error = '';
    loading = true;

    try {
      const formData = new FormData();
      formData.append('sourceLang', $sourceLang);
      formData.append('targetLang', $targetLang);
      formData.append('strings', JSON.stringify($sourceStrings));

      const res = await fetch('/translate', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        proposedTranslations.set(result.data);
        preview = result.data.slice(0, 5);
      } else {
        error = result.error || 'Failed to translate.';
      }
    } catch (err) {
      error = err.message || 'Unexpected error occurred.';
    } finally {
      loading = false;
    }
  }
</script>

<button on:click={handleTranslate} disabled={!canTranslate || loading}>
  {#if loading}
    Translating...
  {:else}
    Translate via AI
  {/if}
</button>

{#if error}
  <p class="form__error">{error}</p>
{/if}

{#if preview.length}
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
