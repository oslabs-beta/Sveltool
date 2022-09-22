<!-- <script>
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
</style> -->
<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  var data = [30, 86, 168, 281, 303, 365];

  let el;

  onMount(() => {
    d3.select(el)
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .style("width", function (d) {
        return d + "px";
      })
      .text(function (d) {
        return d;
      });
  });
</script>

<div class="chart-container chart" bind:this={el} />

<style>
  .chart :global(div) {
    font: 10px sans-serif;
    background-color: steelblue;
    text-align: right;
    padding: 3px;
    margin: 1px;
    color: white;
    padding: 8px;
  }
  .chart-container {
    padding: 15px;
  }
</style>
