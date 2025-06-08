import App from './App.svelte';

let app;

function mountApp() {
  const target = document.getElementById('app');
  if (!target) {
    console.error('Mount target #app not found in DOM.');
    return;
  }

  app = new App({ target });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}

export default app;
