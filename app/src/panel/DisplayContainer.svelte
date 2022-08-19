<script>

import DisplayPanel from "./DisplayPanel.svelte";
  import Navbar from "./Navbar.svelte";
</script>

<div id="display-container">
<Navbar/>
<DisplayPanel/>
</div>

<style>
  #display-container {
    border: 1px solid rgb(105, 107, 112);
    display: grid;
    grid-template-rows: 35px minmax(0, 1fr);
    overflow: auto;
  }
</style>
