<script>
  import { fetchStrings } from '../lib/api';
  import {
    baseUrl, token, project, component,
    targetLang, results, loading
  } from '../stores.js';

  let errorMessage = '';
  let debounce;

  // Debounced fetch
  $: if ($baseUrl && $token && $project && $component && $targetLang) {
    clearTimeout(debounce);
    debounce = setTimeout(loadStrings, 300);
  }

  async function loadStrings() {
    errorMessage = '';
    loading.set(true);

    const { data, error } = await fetchStrings({
      baseUrl: $baseUrl,
      token: $token,
      project: $project,
      component: $component,
      targetLang: $targetLang
    });

    if (error || !Array.isArray(data)) {
      errorMessage = error || 'Failed to fetch strings.';
      results.set([]);
    } else {
      results.set(data);
    }

    loading.set(false);
  }

  async function submitTranslation(id, text) {
    const cleaned = text.trim();
    if (!cleaned) {
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
        body: JSON.stringify({ target: [cleaned] })
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error("Failed to submit:", errData);
        alert(`❌ Failed to submit: ${errData.detail || response.status}`);
      } else {
        console.log(`✅ Submitted translation for ID ${id}`);
      }
    } catch (err) {
      console.error("Error submitting translation:", err);
      alert(`⚠ Error submitting: ${err.message}`);
    }
  }
</script>

{#if errorMessage}
  <div class="error">⚠ {errorMessage}</div>
{/if}

{#if $loading}
  <p>⏳ Loading untranslated strings...</p>
{:else if $results.length === 0}
  <p>✅ No untranslated strings found.</p>
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
