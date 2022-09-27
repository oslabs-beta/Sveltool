<script>
  import '../public/app.css';
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./rightPanel/SideBarContainer.svelte";
</script>

<main>
   <div>Left NavToolBar</div>
   <div>Right NavComponent Display</div>
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
    grid-template-columns: 2fr 1fr;
  }
</style>
