<script>
  export let type;

</script>

<div id={`${type.toLowerCase()}-navbar`}>
  <div>{type}</div>
</div>

<style>
  #state-navbar,
  #props-navbar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(96, 99, 104);
    height: 35px;
    background-color: #282c34
  }

  div {
    padding: 5px;
    color: #fff;
    font-size: 1.2rem;
  }
div:hover{
    background-color: #bbbaba;
}
</style>
