<script>
  import PropsContainer from "./components/PropsContainer.svelte";
  import StateContainer from "./components/StateContainer.svelte";
</script>

<div id="sidebar-container">
  <PropsContainer type={"Props"}  />
  <StateContainer type={"State"}  />
</div>

<style>
  #sidebar-container {
    display: grid;
    grid-template-rows: 70% 30%;
  }
</style>
