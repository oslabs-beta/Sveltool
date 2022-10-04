'use strict';

import App from './App.svelte';
import parser from './parser';

const app = new App({
  target: document.getElementById('app'),
});

parser();

export default app;
