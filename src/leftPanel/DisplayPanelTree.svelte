<script>
  import MyTree from "../utils/d3TreeRender.js";
  import { get } from 'svelte/store';
  import { onMount } from "svelte";
  import { treeData } from '../utils/store';
  import '../AST.js'
  import parser from '../parser.js';

  $: treeData.update(async (tree) => {
    tree.initData = await parser();
    return tree;
  })

  let el;
  let width;
  let height;
  let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  // $: data;

  // treeData.subscribe(value => {
  //   console.log('Tree Data ==> ', value);
  //   data = value;
  // })
  
  onMount(() => {
    {}
    new MyTree(get(treeData.initData)).$onInit(el, width, height, colorScheme);
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
