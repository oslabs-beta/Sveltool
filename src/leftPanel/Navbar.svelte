<script>
  export let panelTree;
  export let panelProfiler;
</script>

<span class="nav-bar">
  <div class="nav-bar-tab" on:click={panelTree}>Component Tree</div>
  <div class="nav-bar-tab" on:click={panelProfiler}>Performance Profiler</div>
</span>

<style>
  .nav-bar {
    display: flex;

    border-bottom: 1px solid rgb(96, 99, 104);
    background-color: #282c34;
  }
  .nav-bar-tab {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: #fff;
    font-size: 1.2rem;
  }
  .nav-bar-tab:hover {
    background-color: #bbbaba;
  }
</style>
