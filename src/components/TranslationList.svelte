<script>
  import { baseUrl, token, results } from '../stores.js';

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

  textarea {
    width: 100%;
    min-height: 60px;
    font-size: 1rem;
    padding: 0.5rem;
  }
</style>
