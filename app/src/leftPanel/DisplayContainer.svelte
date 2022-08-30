<script>
  import DisplayPanelTree from "./DisplayPanelTree.svelte";
  import DisplayPanelChart from "./DisplayPanelChart.svelte";
  import Navbar from "./Navbar.svelte";
  let component;
  let props;
  const panelTree = () => {
    component = DisplayPanelTree;
    props = { treeProp: DisplayPanelTree };
  };

  const panelChart = () => {
    component = DisplayPanelChart;
    props = { chartProps: DisplayPanelTree };
  };
</script>

<div id="display-container">
  <Navbar {panelTree} {panelChart} />
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
