<script>
  import '../public/app.css';
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./sidebar/SideBarContainer.svelte";
  import parser from './newParser';

  parser();
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
    grid-template-columns: 2fr 1fr;
  }
</style>
