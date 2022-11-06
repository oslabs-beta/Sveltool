<script>
  import '../public/app.css';
  import DisplayContainer from "./leftPanel/DisplayContainer.svelte";
  import SideBarContainer from "./rightPanel/SideBarContainer.svelte";
  import NavBarTools from './toolbar/NavBarTools.svelte';
  import DisplayElement from './toolbar/DisplayElement.svelte';
  import { treeData } from './utils/store.js';
  import parser from './utils/parser.js';

  // Gets inspected window resources and parses into json to pass to D3 renderer
  function getData() {
    new Promise(async (resolve, reject) => {
      const data = await parser();
      resolve(data);
    })
      .then(data => {
        treeData.update((tree) => {
          tree.initData = data;
          return tree;
        })
      });
  }
  getData();
</script>

<header>
  <NavBarTools />
  <DisplayElement />
</header>
<main>
  <DisplayContainer />
  <SideBarContainer />
</main>

<style>
  header {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1.5fr 1.5fr;
  }
  main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1.5fr 1.5fr;
  }
</style>
