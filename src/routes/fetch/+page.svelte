<!-- src/routes/fetch/+page.svelte -->
<script>
  import { get } from 'svelte/store';
  import { sourceStrings, selectedComponent, token } from '$lib/stores.js';

  let component = '';
  let error = '';
  let preview = [];
  let loading = false;
  let fetched = false;

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    loading = true;
    fetched = false;

    const formData = new FormData();
    formData.append('token', get(token));
    formData.append('component', component);

    try {
      const res = await fetch('/fetch', { method: 'POST', body: formData });
      const result = await res.json();

      if (result.success) {
        sourceStrings.set(result.data);
        selectedComponent.set(component);
        preview = result.data.slice(0, 5);
        fetched = true;
      } else {
        error = result.error || 'Failed to fetch source strings.';
      }
    } catch (err) {
      error = err.message || 'Unexpected error.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit={handleSubmit} class="form">
  <label>
    Component Slug
    <input type="text" bind:value={component} required />
  </label>

  <button type="submit" disabled={loading}>
    {#if loading}
      Fetching...
    {:else}
      Fetch Strings
    {/if}
  </button>

  {#if error}
    <p class="form__error">{error}</p>
  {/if}
</form>

{#if fetched}
  <h3>Preview (first 5 strings)</h3>
  <ul>
    {#each preview as item}
      <li><code>{item.source}</code> — {item.context}</li>
    {/each}
  </ul>
{/if}

<style>
  .form {
    max-width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form__error {
    color: red;
    font-size: 0.9em;
  }
</style>
