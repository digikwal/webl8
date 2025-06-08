<script lang="ts">
  import Header from '$components/layout/Header.svelte';
  import Footer from '$components/layout/Footer.svelte';
  import ProjectSettings from '$components/forms/ProjectSettings.svelte';

  const handleUpdate = () => {
    console.info('Settings updated');
    // This is where you could trigger a refresh or show a toast
  };
</script>

<Header />

<main class="main">
  <section class="main__section">
    <ProjectSettings on:update={handleUpdate} />
  </section>
</main>

<Footer />
