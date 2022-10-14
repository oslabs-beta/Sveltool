<script>
  import DisplayPanelTree from "./DisplayPanelTree.svelte";
  import PerformanceProfiler from "./PerformanceProfiler.svelte";
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";
  import { visibility } from '../utils/store';








  let component;
  let props;
  onMount(() => {
    panelTree();
  });
  const panelTree = () => {
    component = DisplayPanelTree;
  };


  const panelProfiler = () => {
    component = PerformanceProfiler;
  };
</script>

<div id="display-container">
  <Navbar {panelTree} {panelProfiler} />
  {#if $visibility.component}
  <svelte:component this={component} {...props} />
  {/if}
</div>

<style>
  #display-container {
    border: 1px solid rgb(105, 107, 112);
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    overflow: hidden;
  }
</style>
