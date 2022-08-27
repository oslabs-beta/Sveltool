<script>
  export let type;
  export let data;
</script>

<div id={`${type.toLowerCase()}-display`}>
   <div id={`${type.toLowerCase()}-root`}>{JSON.stringify(data)}</div>
</div>

<style>
  #state-display,
  #props-display {
    background-color: rgb(255, 255, 255);
    margin-top: 1rem;
    margin-left: 1rem;
    overflow: auto;
  }

  #state-root {
    font-size: 1rem;
  }

  #props-root {
    font-size: 1.1rem;
  }
</style>
