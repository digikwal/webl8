<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let item;

  let accepted = null;

  function handleAccept() {
    accepted = true;
    dispatch('accept', { id: item.id, translation: item.translation });
  }

  function handleReject() {
    accepted = false;
    dispatch('reject', { id: item.id });
  }
</script>

<div class="card">
  <div class="row">
    <div class="side source">
      <span class="label">Source</span>
      <p>{item.source}</p>
    </div>
    <div class="side target">
      <span class="label">AI Translation</span>
      <p>{item.translation}</p>
    </div>
  </div>
  <div class="actions">
    <button class:active={accepted === true} on:click={handleAccept}>Accept</button>
    <button class:active={accepted === false} on:click={handleReject}>Reject</button>
  </div>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    background: #fafafa;
  }

  .row {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .side {
    width: 48%;
    background: #f0f0f0;
    padding: 0.75rem;
    border-radius: 4px;
    word-break: break-word;
  }

  .label {
    font-size: 0.8rem;
    font-weight: bold;
    color: #666;
    display: block;
    margin-bottom: 0.3rem;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .actions button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #eee;
    cursor: pointer;
  }

  .actions button.active {
    background-color: #008000;
    color: white;
    border-color: #006400;
  }

  .actions button.active:nth-child(2) {
    background-color: #c62828;
    border-color: #8b0000;
  }
</style>
