import { parse, walk } from 'svelte/compiler';

async function newParser() {
  const dependencies = {};
  const state = {};
  const props = {};
  const output = {};
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
    // console.log('AST ==> ', ast);

    // Walk the AST and output dependencies, props, and state
    walk(ast, {
      enter(ASTnode, parent, prop, index) {
        // find component dependencies
        if (ASTnode.type === 'InlineComponent') {
          const dependencyName = `<${ASTnode.name} />`;
          // console.log('Dependency ==> ', dependencyName);
          dependencies[currentComponent]
            ? dependencies[currentComponent].push(dependencyName)
            : (dependencies[currentComponent] = [dependencyName]);
        }
        // find state
        if (ASTnode.hasOwnProperty('declarations')) {
          console.log('AST node declarations ==> ',
          ASTnode.declarations);
        }
      },
    });
  });

  console.log('Parent > Dependencies List ==> ', dependencies);

  const newArray = [];
  // console.log('newArray empty ==> ', newArray);

  const allComponents = [];
  // console.log('AllComponents Empty ==> ', allComponents);

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
  // console.log('All Components ==> ', allComponents);
  while (!rootComponent) {
    const curr = allComponents.shift()[0];
    // console.log('Current element ==> ', curr);
    let foundRoot = true;
    allComponents.forEach((el) => {
      if (el[1].includes(curr)) foundRoot = false;
    });
    if (foundRoot) rootComponent = curr;
    else allComponents.push(curr);
  }
  console.log('Root component ==> ', rootComponent);
  console.log('Parent > Dependencies List continuity check ==> ', dependencies);

  const outputJSON = {
    name: rootComponent,
    state: {},
    props: {},
    children: [],
  };


}

export default newParser;