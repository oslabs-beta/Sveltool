<script>
  import '../public/app.css';
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./rightPanel/SideBarContainer.svelte";
  import NavBarTools from './leftPanel/NavBarTools.svelte'; 
</script>
<header>
  <span> <NavBarTools/><div>Right NavComponent Display</div></span>
 </header>
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
