<!-- src/routes/review/+page.svelte -->
<script>
  import { goto } from '$app/navigation';
  import TranslationCard from '$components/TranslationCard.svelte';
  import { proposedTranslations, acceptedTranslations } from '$lib/stores.js';

  if ($proposedTranslations.length === 0) {
    goto('/translate');
  }

  let localAccepted = [];

  function handleAccept(event) {
    const { id, translation } = event.detail;
    localAccepted = [...localAccepted.filter((t) => t.id !== id), { id, translation }];
    acceptedTranslations.set(localAccepted);
  }

  function handleReject(event) {
    const { id } = event.detail;
    localAccepted = localAccepted.filter((t) => t.id !== id);
    acceptedTranslations.set(localAccepted);
  }
</script>

<section class="review">
  <h2>Review AI Translations</h2>
  <p>Click <strong>Accept</strong> or <strong>Reject</strong> for each proposed translation.</p>

  {#each $proposedTranslations as item (item.id)}
    <TranslationCard {item} on:accept={handleAccept} on:reject={handleReject} />
  {/each}

  <p class="summary">
    <strong>{$acceptedTranslations.length}</strong> translations selected for upload.
  </p>
</section>

<style>
  .review {
    max-width: 900px;
    margin: auto;
    padding: 2rem;
  }

  .summary {
    margin-top: 2rem;
    font-size: 1.1rem;
  }
</style>
