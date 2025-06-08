<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { apiToken, sourceLang, targetLang, settings } from '$lib/stores/settings';
  import { isValidToken } from '$lib/utils/validate';

  const dispatch = createEventDispatcher();

  let localToken = '';
  let localSource = '';
  let localTarget = '';
  let error = '';

  // derived stores: only readable
  $: localToken = $apiToken;
  $: localSource = $sourceLang;
  $: localTarget = $targetLang;

  function updateSettings() {
    if (!isValidToken(localToken)) {
      error = 'Please enter a valid API token.';
      return;
    }

    settings.update((s) => ({
      ...s,
      apiToken: localToken.trim(),
      sourceLang: localSource.trim(),
      targetLang: localTarget.trim(),
    }));

    dispatch('update');
  }
</script>

<form on:submit|preventDefault={updateSettings}>
  <label>
    API Token:
    <input type="text" bind:value={localToken} required />
  </label>

  <label>
    Source Language:
    <input type="text" bind:value={localSource} placeholder="e.g. en" />
  </label>

  <label>
    Target Language:
    <input type="text" bind:value={localTarget} placeholder="e.g. nl" />
  </label>

  {#if error}
    <p class="form__error">{error}</p>
  {/if}

  <button type="submit">Save</button>
</form>
