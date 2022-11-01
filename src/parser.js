import { parse, walk } from 'svelte/compiler';
import D3DataObject from './createD3DataObject';

async function parser() {
  const dependencies = {};
  const state = {};
  const checked = {};
  const usedComponents = [];
  
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

  // Define function to pull file content from file array
  async function getContent(arrFiles) {
    const content = await arrFiles.map(async (file, index) => {
      const currentComponent = componentNames[index];
  
      // Only check each component once no matter how many copies of each .svelte file there are
      if(checked[currentComponent]) return;
      checked[currentComponent] = true;
      usedComponents.push(currentComponent);
  
      // get file content for each Svelte file and process it
      const output = await new Promise((resolve, reject) => {
        file.getContent(source => {
          if(source) resolve(source);
        });
      });
      return output;
    });
    return Promise.all(content);
  };

  // Process file array into content array
  let arrSvelteContent = await getContent(arrSvelteFiles);  
  // Filter components with no content or duplicate components
  arrSvelteContent = arrSvelteContent.filter(content => {if(content) return content});
  console.log('Svelte Content Array', arrSvelteContent);

  // Iterate over each file content object and process it
  arrSvelteContent.forEach((content, index) => {
    const currentComponent = usedComponents[index];

    // Parse the file contents and build an AST
    const ast = parse(content);
    console.log('AST ==> ', ast);

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
            ASTnode.attributes.forEach(el => {
              foundProps[el.name] = el.value[0].data || '';
            })
            dependencyValue.props = foundProps;
          }
          dependencies[currentComponent]
            ? dependencies[currentComponent].push(dependencyValue)
            : (dependencies[currentComponent] = [dependencyValue]);
        }
      },
    });
  });

  console.log('Parent > Dependencies List ==> ', dependencies);

  const newArray = [];
  // console.log('newArray empty ==> ', newArray);

  const allComponents = [];
  console.log('AllComponents Empty ==> ', allComponents);

  for (const key in dependencies) {
    // console.log('continuity check ==> ', dependencies);
    // console.log('key ==> ', key);
    // console.log('value => ', dependencies[key]);
    // console.log('before ==> ', newArray);
    allComponents.push([key, dependencies[key]]);
    // console.log('after ==> ', newArray);
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
    allComponents.forEach(comp => {
      comp[1].forEach(dep => {
        const {name} = dep;
        if (name === currName) foundRoot = false;
      })
    });
    if (foundRoot) rootComponent = currName;
    allComponents.push(curr);
  }
  console.log('Root component ==> ', rootComponent);
  // console.log('Parent > Dependencies List continuity check ==> ', dependencies);
  const output = new D3DataObject(rootComponent, dependencies, state);
  console.log('Parser Output ==> ', output.data);
  return output.data;
}

export default parser;