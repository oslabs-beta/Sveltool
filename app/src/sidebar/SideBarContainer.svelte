<script>
  import Container from "./components/Container.svelte";
</script>

<div id="sidebar-container">
  <Container type={"Props"} />
  <Container type={"State"} />
</div>

<style>
  #sidebar-container {
    display: grid;
    grid-template-rows: 70% 30%;
  }
</style>
