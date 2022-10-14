import { writable } from 'svelte/store';

export const componentProps = writable({});
export const componentState = writable({});
export const viewType = writable('none');

export const visibility = writable({
  component: true,
  element: true,
  block: true,
  iteration: true,
  slot: true,
  text: true,
  anchor: false,
});
export const selectedNode = writable({});
export const hoveredNodeId = writable(null);
export const rootNodes = writable([]);
export const searchValue = writable('');
export const profilerEnabled = writable(false);
export const profileFrame = writable({});

export const treeData = writable({
  edited: false,
  initData: {},
  editData: {},
});

export const currentComponent = writable('');
