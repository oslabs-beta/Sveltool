<script>
  import '../public/app.css';
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./rightPanel/SideBarContainer.svelte";
  import NavBarTools from './toolbar/NavBarTools.svelte'; 
  import DisplayElement from './toolbar/DisplayElement.svelte';
 
</script>
<header>
  <NavBarTools/>
  <DisplayElement component={"APP"} />
 </header>
<main>
 
  <DisplayContainer />
  <SideBarContainer />
 
</main>
<style>
header {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
 main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
</style>
