<script>
  import { componentProps } from "../../utils/store";
  export let type;
  let props;
  let propsArray;

  componentProps.subscribe((val) => {
    propsArray = [];
    props = val;
    for (const key in props) {
      propsArray = [...propsArray, `${key}: ${JSON.stringify(props[key])}`];
    }
  });
</script>

<div id={`${type.toLowerCase()}-display`}>
  <ul>
    {#each propsArray as prop}
      <li id={`${type.toLowerCase()}-root`}>{prop}</li><br/>
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
