<script>
  import MyTree from "../utils/d3TreeRender.js";
  import {get } from 'svelte/store';
  import { onMount } from "svelte";
  import {  treeData } from '../utils/store';
  import '../AST.js'
  import parser from '../parser.js';

  $: treeData.update(async (tree) => {
    tree.initData = await parser();
    return tree;
  })

  $: t = get(treeData);

  let el;
  let width;
  let height;
  let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  onMount(() => {
    new MyTree(t.initData).$onInit(el, width, height, colorScheme);
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
