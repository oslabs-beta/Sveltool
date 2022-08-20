<script>
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./sidebar/SideBarContainer.svelte";



</script>

<main>
  <DisplayContainer />
  <SideBarContainer />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    /* grid-template-columns: minmax(0, 60%) minmax(0, 40%); */
    grid-template-columns: 2fr 1fr;
  }
</style>
