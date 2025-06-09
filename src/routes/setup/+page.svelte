<!-- src/routes/setup/+page.svelte -->
<script>
  import {
    token,
    project,
    sourceLang,
    targetLang,
    availableSources,
    availableTargets,
  } from '$lib/stores.js';

  import { goto } from '$app/navigation';

  let localToken = '';
  let localProject = '';
  let error = '';
  let submitted = false;

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    submitted = false;

    if (!localToken.trim() || !localProject.trim()) {
      error = 'All fields are required.';
      return;
    }

    const formData = new FormData();
    formData.append('token', localToken);
    formData.append('project', localProject);

    const response = await fetch('/setup', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // Update global stores
      token.set(localToken);
      project.set(localProject);
      sourceLang.set(result.data.source_lang);
      targetLang.set(result.data.target_langs[0] || '');
      availableSources.set([result.data.source_lang]);
      availableTargets.set(result.data.target_langs);

      // Go to next step (optional)
      goto('/fetch');
    } else {
      error = result.error || 'Failed to fetch Weblate project.';
    }

    submitted = true;
  }
</script>

<form on:submit={handleSubmit} class="form">
  <label>
    API Token
    <input name="token" type="password" bind:value={localToken} required />
  </label>

  <label>
    Project Slug
    <input name="project" type="text" bind:value={localProject} required />
  </label>

  {#if $availableSources.length}
    <label>
      Source Language
      <select bind:value={$sourceLang}>
        {#each $availableSources as lang}
          <option value={lang}>{lang}</option>
        {/each}
      </select>
    </label>
  {/if}

  {#if $availableTargets.length}
    <label>
      Target Language
      <select bind:value={$targetLang}>
        {#each $availableTargets as lang}
          <option value={lang}>{lang}</option>
        {/each}
      </select>
    </label>
  {/if}

  <button type="submit">Fetch</button>

  {#if error}
    <p class="form__error">{error}</p>
  {/if}
</form>

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

  select {
    width: 100%;
  }
</style>
