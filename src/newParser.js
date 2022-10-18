import { parse, walk } from 'svelte/compiler';

async function newParser() {
  const dependencies = {};
  const state = {};
  const props = {};
  const output = {};
  const checked = {};
  
  const arrSvelteFiles = await new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.getResources((resources) => {
      const filteredResources = resources.filter(file => file.url.includes('.svelte'));
      if (filteredResources) resolve(filteredResources);
      else reject('No Svelte Resources Found');
    })
  });

  console.log('Found Svelte Files ==> ', arrSvelteFiles);

  const componentNames = arrSvelteFiles.map(
    svelteFile => `<${svelteFile.url.slice(
      svelteFile.url.lastIndexOf('/') + 1,
      svelteFile.url.lastIndexOf('.')
    )} />`
  )

  console.log('Component Names ==> ', componentNames);

  // Go through each component to list their dependencies, props, and state
  const arrSvelteContent = await new Promise((resolve, reject) => {
    const content = arrSvelteFiles.map(async (file, index) => {
      const currentComponent = componentNames[index];

      // Only check each component once no matter how many copies of each .svelte file there are
      if (checked[currentComponent]) return;
      checked[currentComponent] = true;

      // get file content for each Svelte file and process it
      file.getContent((source) => {
        if (source) resolve(source);
      });
    resolve(content);
  });

  console.log('Svelte Content Array', arrSvelteContent);

  console.log('Dependencies Object ==> ', dependencies);
  for (const key in object) {
    console.log('Accessing dependencies object ==> ', depedencies[key]);
  }

  // find the root component
  // let rootComponent;
  const allComponents = Object.entries(dependencies);
  console.log('All Components ==> ', allComponents);
  // while (!rootComponent) {
  //   const curr = allComponents.shift()[0];
  //   console.log('Current element ==> ', curr);
  //   let foundRoot = true;
  //   allComponents.forEach((el) => {
  //     if (el[1].includes(curr)) foundRoot = false;
  //   });
  //   if (foundRoot) rootComponent = curr;
  //   else allComponents.push(curr);
  // }
  // console.log('Root component ==> ', rootComponent);
}

export default newParser;