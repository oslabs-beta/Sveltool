'use strict';

import App from './App.svelte';
import getInspectedResources from './getInspectedResources';
import parser from './parser';

const app = new App({
  target: document.getElementById('app'),
});

const resources = getInspectedResources();
parser(resources);

export default app;
