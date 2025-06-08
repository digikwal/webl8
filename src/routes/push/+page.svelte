<script>
    import {
      token,
      selectedComponent,
      acceptedTranslations
    } from '$lib/stores.js';
    import { get } from 'svelte/store';
  
    let status = '';
    let error = '';
    let loading = false;
    let pushed = false;
  
    async function handlePush() {
      loading = true;
      status = '';
      error = '';
      pushed = false;
  
      const formData = new FormData();
      formData.append('token', get(token));
      formData.append('component', get(selectedComponent));
      formData.append('accepted', JSON.stringify(get(acceptedTranslations)));
  
      const res = await fetch('/push', {
        method: 'POST',
        body: formData
      });
  
      const result = await res.json();
      loading = false;
  
      if (result.success) {
        status = `✅ Successfully pushed ${result.count} translations to Weblate.`;
        pushed = true;
      } else {
        error = result.error || '❌ Failed to push translations.';
      }
    }
  </script>
  
  <button on:click={handlePush} disabled={loading || pushed}>
    {#if loading}Pushing...{else if pushed}✅ Done!{else}Push to Weblate{/if}
  </button>
  
  {#if error}
    <p class="form__error">{error}</p>
  {/if}
  {#if status}
    <p class="form__success">{status}</p>
  {/if}
  
  <style>
    .form__error {
      color: red;
      font-size: 0.9em;
    }
    .form__success {
      color: green;
      font-size: 0.9em;
    }
  </style>
  