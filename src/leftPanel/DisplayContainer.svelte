<script>
  import DisplayPanelTree from "./DisplayPanelTree.svelte";
  import PerformanceProfiler from "./PerformanceProfiler.svelte";
  import Navbar from "./Navbar.svelte";
  import { onMount } from "svelte";
  let component;
  let props;
  onMount(() => {
    panelTree();
  });
  const panelTree = () => {
    component = DisplayPanelTree;
    props = { treeProp: DisplayPanelTree };
  };
 

  const panelProfiler = () => {
    component = PerformanceProfiler;
    props = { chartProps: PerformanceProfiler };
  };
</script>

<div id="display-container">
  <Navbar {panelTree} {panelProfiler} />
  <svelte:component this={component} {...props} />
  <!-- <DisplayPanel  /> -->
</div>

<style>
  #display-container {
    border: 1px solid rgb(105, 107, 112);
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    overflow: hidden;
  }
</style>
