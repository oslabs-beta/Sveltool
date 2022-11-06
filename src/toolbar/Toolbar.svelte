<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    align-items: stretch;
    padding: 0 0.417rem;
    border-right: 2px solid rgb(96, 99, 104);
  }
  :global(.dark) div {
    background-color: rgb(42, 42, 46);
  }
  
</style>
