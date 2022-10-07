import { parse, walk } from 'svelte/compiler';

function parser() {
  const dependencies = {};
  const state = {};
  const props = {};
  const output = {};
  const checked = {};

  // get all resources being served
  chrome.devtools.inspectedWindow.getResources((stuff) => {
    // filter Svelte files from rescources
    // console.log('All resources ==> ', stuff);
    const arrSvelteFiles = stuff.filter((file) => file.url.includes('.svelte'));
    // console.log('arrSvelteFiles: ', arrSvelteFiles);

    // Save a list of all Svelte component names
    const componentNames = arrSvelteFiles.map(
      (svelteFile) =>
        `<${svelteFile.url.slice(
          svelteFile.url.lastIndexOf('/') + 1,
          svelteFile.url.lastIndexOf('.')
        )} />`
    );

    // Go through each component to list their dependencies, props, and state
    arrSvelteFiles.forEach((file, index) => {
      const currentComponent = componentNames[index];

      // Only check each component once no matter how many copies of each .svelte file there are
      if (checked[currentComponent]) return;
      checked[currentComponent] = true;

      // console.log('File ==> ', file);
      // get file content for each Svelte file and process it
      file.getContent((source) => {
        if (source) {
          // console.log('source --> ', source);

          // convert source to ast
          const ast = parse(source);
          // console.log('ast --> ', ast);

          // walk ast and output dependencies, props, and state
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
                // console.log('AST node declarations ==> ',
                // ASTnode.declarations);
              }
            },
          });
        }
      });
    });
  });
  console.log('Dependencies Object ==> ', dependencies);

  // find the root component
  let rootComponent;
  const allComponents = Object.entries(dependencies);
  console.log('All Components ==> ', allComponents);
  while (!rootComponent) {
    const curr = allComponents.shift()[0];
    console.log('Current element ==> ', curr);
    let foundRoot = true;
    allComponents.forEach((el) => {
      if (el[1].includes(curr)) foundRoot = false;
    });
    if (foundRoot) rootComponent = curr;
    else allComponents.push(curr);
  }
  console.log('Root component ==> ', rootComponent);
}

// Test for JSFiddle

// const dependencies = {'<List />': ['<Item />'], '<App />': ["<List />", "<List />", "<Footer />"]}

// let rootComponent;
// console.log('Dependencies ==> ', dependencies);
// const allComponents = Object.entries(dependencies);
// console.log('All Components ==> ', allComponents);
// while (!rootComponent) {
//   const curr = allComponents.shift()[0];
//   console.log('Current element ==> ', curr);
//   let foundRoot = true;
//   allComponents.forEach(el => {
//     if (el[1].includes(curr)) foundRoot = false;
//   })
//   if (foundRoot) rootComponent = curr;
//   else allComponents.push(curr);
// }
// console.log('Root component ==> ', rootComponent);

export default parser;
