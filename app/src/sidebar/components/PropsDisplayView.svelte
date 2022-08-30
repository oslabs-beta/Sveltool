<script>
  export let type;
  export let data;

  const propsArray = [];

  for (const key in data) {
    propsArray.push(`${key}: ${data[key]}`);
  }

</script>

<div id={`${type.toLowerCase()}-display`}>
  <ul>
    {#each propsArray as prop}
      <li id={`${type.toLowerCase()}-root`}>{prop}</li>
    {/each}
  </ul>
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
