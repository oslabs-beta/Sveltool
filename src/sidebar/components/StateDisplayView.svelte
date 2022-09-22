<script>
  import { componentState } from "../../utils/store";
  export let type;
  let state;
  let stateArray;

  componentState.subscribe((val) => {
    stateArray = [];
    state = val;
    for (const key in state) {
      stateArray = [...stateArray, `${key}: ${JSON.stringify(state[key])}`];
    }
  });
</script>

<div id={`${type.toLowerCase()}-display`}>
  <ul>
    {#each stateArray as prop}
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
