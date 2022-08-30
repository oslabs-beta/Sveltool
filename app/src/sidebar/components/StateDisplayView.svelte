<script>
  export let type;
  export let data;
 
  console.log('data-->', data)
</script>

<div id={`${type.toLowerCase()}-display`}>
   <div id={`${type.toLowerCase()}-root`}>{JSON.stringify(data)}</div>
</div>
<style>
  #state-display,
  #props-display {
    /* background-color: rgb(255, 255, 255); */
    padding-top: 1rem;
    padding-left: 1rem;
    overflow: auto;
    color: #fff;
  }

  #state-root {
    font-size: 1rem;
  }

  #props-root {
    font-size: 1.1rem;
  }
</style>
