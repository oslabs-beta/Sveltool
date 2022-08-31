export default function getResources() {
  
  const svelteFilesArr = chrome.devtools.inspectedWindow.getResources(resources => {
    return resources.filter(file => file.url.includes(".svelte"));
  });
  
  const componentNames = svelteFilesArr.map(svelteFile => `<${svelteFile.url.slice(
    svelteFile.url.lastIndexOf("/") + 1,
    svelteFile.url.lastIndexOf(".s")
  )} />`);
  
  const resDiv = document.createElement('div');
  resDiv.setAttribute('id', 'names');
  document.body.appendChild(resDiv);
  resDiv.innerText = JSON.stringify(componentNames);
  
  console.log('WHERE AM I?!?!')
  
  let count = 0;
  svelteFilesArr.forEach(svelteFile => {
    svelteFile.getContent(source => {
      if (source) {
        const ast = parse(source);
        const astDiv = document.createElement('div');
        astDiv.setAttribute('id', `${count++}ast`)
        document.querySelector('#names').appendChild(astDiv);
        resDiv.innerText = JSON.stringify(componentNames);
      }
    });
  });
  
}