import App from './App.svelte';

const target = document.getElementById('app');

if (!target) {
  console.error('❌ Mount target #app not found in the DOM.');
  console.log('DOM structure:', document.body.innerHTML); // Log the DOM structure for debugging
  throw new Error('Missing mount target: #app');
} else {
  console.log('✅ Mount target #app found:', target); // Confirm the target element exists
}

const app = new App({ target });
console.log('✅ App component successfully mounted:', app); // Log the app instance for debugging

export default app;