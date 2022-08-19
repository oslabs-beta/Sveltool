<script>
  import SideNavBar from "./SideNavBar.svelte";
  import DisplayView from "./DisplayView.svelte";
  export let type;
</script>

<div id={`${type.toLowerCase()}-container`}>
  <SideNavBar {type} />
  <DisplayView {type} />
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
