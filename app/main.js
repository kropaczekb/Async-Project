import App from './App.svelte';
import './global.css';

const app = new App({
    target: document.getElementById('root'), // entry point in ../public/index.html
    // hydrate: true,
});

export default app;
