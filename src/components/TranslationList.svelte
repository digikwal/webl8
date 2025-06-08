<script>
  import { fetchStrings } from '../lib/api';
  import { baseUrl, token, project, component, targetLang, results, loading } from '../stores.js';

  let errorMessage = '';

  async function loadStrings() {
    loading.set(true);
    const { data, error } = await fetchStrings({
      baseUrl: $baseUrl,
      token: $token,
      project: $project,
      component: $component,
      targetLang: $targetLang
    });

    if (error) {
      errorMessage = error; // Display error in the UI
      results.set([]);
    } else {
      results.set(data); // Update the store with fetched strings
    }
    loading.set(false);
  }

  $: if ($baseUrl && $token && $project && $component && $targetLang) {
    loadStrings();
  }

  async function submitTranslation(id, text) {
    if (!text || text.trim().length === 0) {
      console.warn("Empty translation skipped");
      return;
    }

    try {
      const response = await fetch(`${$baseUrl}/units/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${$token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ target: [text.trim()] })
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Failed to submit:", errData);
      }
    } catch (err) {
      console.error("Error submitting translation:", err);
    }
  }
</script>

{#if errorMessage}
  <div class="error">Error: {errorMessage}</div>
{/if}

{#if $results.length === 0}
  <p>No untranslated strings found.</p>
{:else}
  {#each $results as r (r.id)}
    <div class="unit">
      <div class="source"><strong>Source:</strong> {r.source[0]}</div>
      <textarea
        placeholder="Translation"
        on:blur={(e) => submitTranslation(r.id, e.target.value)}
      ></textarea>
    </div>
  {/each}
{/if}

<style>
  .unit {
    margin-top: 2rem;
  }

  .source {
    margin-bottom: 0.5rem;
  }

  .error {
    color: red;
    margin-bottom: 1rem;
  }

  textarea {
    width: 100%;
    min-height: 60px;
    font-size: 1rem;
    padding: 0.5rem;
  }
</style>