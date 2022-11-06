<script>
  export let disabled = false;
  export let active = true;
  export let type = 'button'
</script>

<button on:click {disabled} {type} class:active>
  <slot />
</button>

<style>
  
  button {
    position: relative;
    z-index: 1;
    margin: 0.083rem /* 1px */;
    padding: 0.417rem /* 5px */;
    outline: none;
    border: none;
    border-radius: 0.167rem /* 2px */;
    background-color: transparent;
    color: rgba(249, 249, 250, 0.7);
    cursor: pointer;
    line-height: 0;
  }

  button.active {
    color: rgb(141, 157, 179);
  }

  button:hover {
    color: rgb(237, 237, 240);
  }

  button:active:hover {
    color: #61dafb;
  }

  button:disabled {
    color: rgba(12, 12, 13, 0.2);
  }

  :global(.dark) button {
    color: rgba(249, 249, 250, 0.7);
  }

  :global(.dark) button.active {
    color: rgb(117, 186, 255);
  }

  :global(.dark) button:hover {
    background-color: rgb(37, 37, 38);
  }

  :global(.dark) button:active {
    color: rgba(249, 249, 250, 0.8);
  }

  :global(.dark) button:disabled,
  button:disabled {
    background-color: transparent;
    cursor: default;
  }

  button :global(svg) {
    width: 1.333rem;
    height: 1.333rem;
    vertical-align: middle;
    fill: currentColor;
  }
  button :hover(svg) {
    width: 1.333rem;
    height: 1.333rem;
    vertical-align: middle;
    fill: currentColor;
    color: #61dafb;
  }
</style>
