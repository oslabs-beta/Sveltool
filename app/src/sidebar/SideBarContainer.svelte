<script>
  import Container from "./components/Container.svelte";
  import {componentProps, componentState } from "../utils/store.js";
  let props;
  let state;


  componentProps.subscribe(val=>{
    props = val;

  });

componentState.subscribe(val=>{
    state = val;

});

</script>

<div id="sidebar-container">

  <Container type={"Props"} data={props} />
  <Container type={"State"} data={state} />
</div>

<style>
  #sidebar-container {
    display: grid;
    grid-template-rows: 70% 30%;
  }
</style>
