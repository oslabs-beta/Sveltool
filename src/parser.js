import {
  parse,
  walk
} from 'svelte/compiler';

function parser() {
  const dependencies = {};
  const state = {};
  const props = {};
  const output = {};
  
  chrome.devtools.inspectedWindow.getResources((stuff) => {
    // filter Svelte files from "rescources"
    // console.log('All resources ==> ', stuff);
    const arrSvelteFiles = stuff.filter((file) =>
      file.url.includes('.svelte')
    );
    // console.log('arrSvelteFiles: ', arrSvelteFiles);
    const componentNames = arrSvelteFiles.map((svelteFile) =>
      `<${svelteFile.url.slice(
      svelteFile.url.lastIndexOf('/') + 1,
      svelteFile.url.lastIndexOf('.')
      )} />`
    );
    

    arrSvelteFiles.forEach((file, index) => {
      const currentComponent = componentNames[index];
      // console.log('File ==> ', file);
      file.getContent((source) => {
        if (source) {
          // console.log('source --> ', source);
          const ast = parse(source);
          console.log('ast --> ', ast);
          walk(ast, {
            enter(ASTnode, parent, prop, index) {
              // find component dependencies
              if(ASTnode.type === 'InlineComponent') {
                // const dependencyName = `<${ASTnode.source.value.slice(
                //   ASTnode.source.value.lastIndexOf("/") + 1,
                //   ASTnode.source.value.lastIndexOf(".")
                // )} />`;
                const dependencyName = `<${ASTnode.name} />`
                console.log('Dependency ==> ', dependencyName);
                dependencies[currentComponent] ? dependencies[currentComponent].push(dependencyName) : dependencies[currentComponent] = [dependencyName];
              }
              // find state
              if (ASTnode.hasOwnProperty('declarations')) {
                // console.log('AST node declarations ==> ',
                  // ASTnode.declarations);
              }
            }
          });
        }
      });
    });
  });
  console.log('Dependencies Object ==> ', dependencies);
}

export default parser;
