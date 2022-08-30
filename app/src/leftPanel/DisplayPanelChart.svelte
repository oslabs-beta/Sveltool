<script>
  import { onMount } from "svelte";

  let el;
  let width;
  let height;

  let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  onMount(() => {
   
    // myTreeChar.$onInit(el, width, height, colorScheme);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
    colorScheme = e.matches ? "dark" : "light";
    // myTreeChar.update(myTreeChar.root, colorScheme);
  });
</script>
<div>Chart</div>

<div
  class="hierarchy-container"
  bind:clientWidth={width}
  bind:clientHeight={height}
  bind:this={el}
/>

<style>
</style>
