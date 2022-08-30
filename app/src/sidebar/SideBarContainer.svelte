<script>
  import { componentProps, componentState } from "../utils/store.js";
  import PropsContainer from "./components/PropsContainer.svelte";
  import StateContainer from "./components/StateContainer.svelte";
  let props;
  let state;

  componentProps.subscribe((val) => {
    props = val;
  });

  componentState.subscribe((val) => {
    console.log(val, '<=== state val')
    state = val;
  });
 
</script>

<div id="sidebar-container">
  <PropsContainer type={"Props"} data={props} />
  <StateContainer type={"State"} data={state} />
</div>

<style>
  #sidebar-container {
    display: grid;
    grid-template-rows: 70% 30%;
  }
</style>
