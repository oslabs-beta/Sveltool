<script>

import tree from '../utils/d3Render.js';
import {onMount} from 'svelte';
import {count} from '../utils/store.js'


let el;
let width;
let height;
let countValue;

count.subscribe(val=>{
    countValue = val
})

let colorScheme =  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';


onMount(() =>{
tree.$onInit(el, width, height, colorScheme);
})


window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
    colorScheme = e.matches ? 'dark' : 'light'
    tree.update(tree.root,  colorScheme);
});


</script> 

<!-- <div>{countValue}</div> -->
<div class="hierarchy-container" bind:this={el} bind:clientWidth={width} bind:clientHeight={height}></div>

<style>
</style>