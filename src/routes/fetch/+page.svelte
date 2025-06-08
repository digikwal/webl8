<script>
    import { sourceStrings, selectedComponent, token } from '$lib/stores.js';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    let component = '';
    let error = '';
    let fetched = false;
    let preview = [];
  
    async function handleSubmit(event) {
      event.preventDefault();
      error = '';
      fetched = false;
  
      const formData = new FormData();
      formData.append('token', $token);
      formData.append('component', component);
  
      const res = await fetch('/fetch', { method: 'POST', body: formData });
      const result = await res.json();
  
      if (result.success) {
        sourceStrings.set(result.data);
        selectedComponent.set(component);
        preview = result.data.slice(0, 5);
        fetched = true;
        dispatch('fetched', result.data);
      } else {
        error = result.error || 'Failed to fetch source strings.';
      }
    }
  </script>
  
  <form on:submit={handleSubmit} class="form">
    <label>
      Component Slug
      <input type="text" bind:value={component} required />
    </label>
    <button type="submit">Fetch Strings</button>
    {#if error}<p class="form__error">{error}</p>{/if}
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
    }
    .form__error {
      color: red;
      font-size: 0.9em;
    }
  </style>
  