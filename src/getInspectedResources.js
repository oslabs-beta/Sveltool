// import parser from './parser.js';

// function getInspectedResources() {
//   // const arrContent = [];
//   // get all files from current tab
//   chrome.devtools.inspectedWindow.getResources((stuff) => {
//     // filter Svelte files from "rescources"
//     console.log('All resources ==> ', stuff);
//     const arrSvelteFiles = stuff.filter((file) =>
//       file.url.includes('.svelte')
//     );
//     console.log('arrSvelteFiles: ', arrSvelteFiles);
//     const componentNames = arrSvelteFiles.map(
//       (svelteFile) =>
//         `<${svelteFile.url.slice(
//           svelteFile.url.lastIndexOf('/') + 1,
//           svelteFile.url.lastIndexOf('.')
//         )} />`
//     );

//     arrSvelteFiles.forEach((file) => {
//       file.getContent((source) => {
//         if (source) {
//         console.log('source --> ', source);
//           // const ast = parse(source);
//           // console.log('ast --> ', ast);
//           // // createNode(ast)
//           parser(source);
//         }
//         // arrContent.push(source);
//       });
//     });
//     // console.log('Content Array ==> ', arrContent);
//   });
//   return arrContent;
// }

// export default getInspectedResources;