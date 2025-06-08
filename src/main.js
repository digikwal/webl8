import App from './App.svelte';

const target = document.getElementById('app');

if (!target) {
  console.error('❌ Mount target #app not found in the DOM.');
  throw new Error('Missing mount target: #app');
}

const app = new App({ target });

export default app;
