<script>

import tree from '../utils/d3Render.js';
import {onMount} from 'svelte';
let el;
let width;
let height;

let colorScheme =  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';


onMount(() =>{
tree.$onInit(el, width, height, colorScheme);
})


window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
    colorScheme = e.matches ? 'dark' : 'light'
    
    tree.update(tree.root,  colorScheme);
});


</script> 

<div class="hierarchy-container" bind:this={el} bind:clientWidth={width} bind:clientHeight={height}></div>

<style>
</style>