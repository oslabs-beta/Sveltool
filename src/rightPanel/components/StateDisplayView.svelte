<script>
  import { componentState } from "../../utils/store";
  import changeState from '../../utils/changeState';
  export let type;
  let state;
  let el;
  let result;

  componentState.subscribe((val) => {
    state = val;
    result = changeState(state);
    if(el) el.innerHTML = '';
    if(result){

      result.forEach((element) => {
      el.appendChild(element)
    });
    }
  });

</script>

<div id={`${type.toLowerCase()}-display`} bind:this={el} />
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
