<script>
  import MyTree from "../utils/d3TreeRender.js";   
  import { treeData } from '../utils/store.js';

  let el;
  let width;
  let height;
  let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
 
  treeData.subscribe((data) => {
    console.log('Tree initialization data ==> ', data.initData);
    new MyTree(data.initData).$onInit(el, width, height, colorScheme);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
    colorScheme = e.matches ? "dark" : "light"; //#282c34
    tree.update(tree.root, colorScheme);
  });

</script>

<div
  class="hierarchy-container"
  bind:this={el}
  bind:clientWidth={width}
  bind:clientHeight={height}
/>

<style>
</style>
