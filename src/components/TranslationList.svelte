<script>
  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import {
    baseUrl, token, targetLang,
    results, loading
  } from '../stores.js';
  import { fetchStrings } from '../lib/api';

  let errorMessage = '';
  const dispatch = createEventDispatcher();

  // This function can be called externally via bind:this
  export let loadStrings = async () => {
    errorMessage = '';
    loading.set(true);

    const { data, error } = await fetchStrings({
      baseUrl: $baseUrl,
      token: $token,
      project: globalThis.$project,
      component: globalThis.$component,
      targetLang: $targetLang
    });

    if (error || !Array.isArray(data)) {
      errorMessage = error || 'Failed to fetch strings.';
      results.set([]);
    } else {
      results.set(data);
    }

    loading.set(false);
  };

  async function submitTranslation(id, text) {
    const cleaned = text.trim();
    if (!cleaned) return;

    try {
      const res = await fetch(`${$baseUrl}/units/${id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Token ${$token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: [cleaned] })
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error('❌ Failed to submit:', errData);
        alert(`❌ Submission failed: ${errData.detail || res.status}`);
      } else {
        console.log(`✅ Submitted translation for ID ${id}`);
        dispatch('submitted', { id }); // optional if you want parent to react
      }
    } catch (err) {
      console.error('⚠ Error submitting:', err);
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