<script>
  import { currentComponent } from '../utils/store';

  let component;
  currentComponent.subscribe((d) => {
    component = d;
  });
</script>

<div class="svelte-display-element">{component}</div>

<style>
  .svelte-display-element {
    color: rgb(64, 179, 255);
    font-size: 12px;
    font-weight: 500;
    padding: 5px;
    text-transform: uppercase;
  }
</style>
