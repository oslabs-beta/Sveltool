<script>
  import SideNavBar from "./SideNavBar.svelte";
  import StateDisplayView from "./StateDisplayView.svelte";

  export let type;



</script>

<div id={`${type.toLowerCase()}-container`}>
  <SideNavBar {type} />
  <StateDisplayView {type}  />
</div>

<style>
  #state-container,
  #props-container {
    border: 1px solid rgb(105, 107, 112);
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    overflow: auto;
  }

  #props-container {
    grid-template-rows: 30px minmax(0, 1fr);
  }
</style>
