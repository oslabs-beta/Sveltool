import { parse, walk } from 'svelte/compiler';
import D3DataObject from './createD3DataObject';

async function parser() {
  // Define temporary data structures
  const dependencies = {};
  const state = {};
  const checked = {};
  const usedComponents = [];

  // Get all files from inspected window that end in ".svelte"
  const arrSvelteFiles = await new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.getResources((resources) => {
      const filteredResources = resources.filter((file) =>
        file.url.includes('.svelte')
      );
      if (filteredResources) resolve(filteredResources);
      else reject('No Svelte Resources Found');
    });
  });

  // Create an array of component names from ".svelte" files
  const componentNames = arrSvelteFiles.map(
    (svelteFile) =>
      `<${svelteFile.url.slice(
        svelteFile.url.lastIndexOf('/') + 1,
        svelteFile.url.lastIndexOf('.')
      )} />`
  );

  // Define function to pull file content from filtered file array
  async function getContent(arrFiles) {
    const content = await arrFiles.map(async (file, index) => {
      const currentComponent = componentNames[index];

      // Only check each component once no matter how many copies of each .svelte file there are
      if (checked[currentComponent]) return;
      checked[currentComponent] = true;
      usedComponents.push(currentComponent);

      // get file content for each Svelte file and process it
      const output = await new Promise((resolve, reject) => {
        file.getContent((source) => {
          if (source) resolve(source);
        });
      });
      return output;
    });
    return Promise.all(content);
  }

  // Process file array into content array
  let arrSvelteContent = await getContent(arrSvelteFiles);
  // Filter components with no content or duplicate components
  arrSvelteContent = arrSvelteContent.filter((content) => {
    if (content) return content;
  });

  // Iterate over each file content object and process it
  arrSvelteContent.forEach((content, index) => {
    const currentComponent = usedComponents[index];

    // Parse the file contents and build an AST
    const ast = parse(content);

    // Walk the AST and output dependencies, props, and state
    walk(ast, {
      enter(ASTnode, parent, prop, index) {
        // find component dependencies
        if (ASTnode.type === 'InlineComponent') {
          const dependencyValue = {};
          dependencyValue.name = `<${ASTnode.name} />`;
          // find props
          if (ASTnode.attributes[0]) {
            const foundProps = {};
            ASTnode.attributes.forEach((el) => {
              foundProps[el.name] = el.value[0].data || '';
            });
            dependencyValue.props = foundProps;
          }
          dependencies[currentComponent]
            ? dependencies[currentComponent].push(dependencyValue)
            : (dependencies[currentComponent] = [dependencyValue]);
        }
      },
    });
  });

  // Build array of all components from dependency array with thier depedencies
  const allComponents = [];
  for (const key in dependencies) {
    allComponents.push([key, dependencies[key]]);
  }

  // find the root component
  let rootComponent;
  // const allComponents = Object.entries(dependencies);
  console.log('All Components ==> ', allComponents);
  while (!rootComponent) {
    const curr = allComponents.shift();
    const currName = curr[0];
    // console.log('Current element ==> ', curr);
    let foundRoot = true;
    allComponents.forEach((comp) => {
      comp[1].forEach((dep) => {
        const { name } = dep;
        if (name === currName) foundRoot = false;
      });
    });
    if (foundRoot) rootComponent = currName;
    allComponents.push(curr);
  }
  
  // Build output json to send to D3 renderer
  // state is not currently being found or passed to D3
  const output = new D3DataObject(rootComponent, dependencies, state);
  return output.data;
}

export default parser;
