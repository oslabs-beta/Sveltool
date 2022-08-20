<script>

import tree from '../utils/d3Render.js';
import {onMount} from 'svelte';
let el;

onMount(() =>{
tree.$onInit(el);
})




</script>
<div>
    <div class="hierarchy-container" bind:this={el} ></div>
</div>

<style>
</style>