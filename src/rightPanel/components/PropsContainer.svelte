<script>
  import SideNavBar from "./SideNavBar.svelte";

  import PropsDisplayView from "./PropsDisplayView.svelte";

  export let type;

</script>

<div id={`${type.toLowerCase()}-container`}>
  <SideNavBar {type} />
  <PropsDisplayView {type}  />
</div>

<style>
  #state-container,
  #props-container {
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    overflow: auto;
  }
</style>
