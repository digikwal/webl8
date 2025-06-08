<script>
  export let onFetched = () => {};

  import { get } from 'svelte/store';
  import { sourceStrings, selectedComponent, token } from '$lib/stores.js';

  let component = '';
  let error = '';
  let fetched = false;
  let preview = [];

  async function handleSubmit(event) {
    event.preventDefault();
    error = '';
    fetched = false;

    const formData = new FormData();
    formData.append('token', get(token));
    formData.append('component', component);

    const res = await fetch('/fetch', { method: 'POST', body: formData });
    const result = await res.json();

    if (result.success) {
      sourceStrings.set(result.data);
      selectedComponent.set(component);
      preview = result.data.slice(0, 5);
      fetched = true;
      onFetched(result.data);
    } else {
      error = result.error || 'Failed to fetch source strings.';
    }
  }
</script>
