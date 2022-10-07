//iterate through data recursively
//the data that we're pulling is from props display view
 import { componentProps } from './store';


componentProps.subscribe((val) => {
  console.log(val);
})



function parseObjects(state, parent) {
  for (const key in state) {
    parent.appendChild(createDivEl(key, state[key]));
  }
  
}

function parseList(list, container) {
  const cn = document.createElement("div");
  const header = document.createElement("div");
  const parent = document.createElement('ul');


  header.innerHTML = container;
  header.style.fontSize = "1.5rem"

  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0 && !list[i]) continue;

    const child = document.createElement('li');
    if (Array.isArray(list[i])) {
      child.appendChild(parseList(list[i]));
    } else if (typeof list[i] === 'object') {
      parseObjects(list[i], child); // newItem: 'study' , li
    } else {
      child.innerText = list[i];
    }

    parent.appendChild(child);
  }
 

  cn.style.padding = '1rem 0'
  cn.appendChild(header)
  cn.appendChild(parent)
  console.log('parseList parent=>',parent) 
  return cn;
}

function createDivEl(key, value) {
  const divParent = document.createElement('div'); 
  const spanChild1 = document.createElement('span');
  const spanChild2 = document.createElement('input');
  spanChild1.innerText = `${key} : `
  spanChild1.style.fontSize = '12px'
  spanChild1.style.fontWeight = 500;
  
  spanChild2.value = value;
  spanChild2.style.color = '#40b3ff';
  spanChild2.style.background = 'transparent';
  spanChild2.style.border = 'none';
  spanChild2.style.outline = 'none';
  spanChild2.style.width = 'fit-content';
  spanChild2.style.fontSize = '12px'
  spanChild2.style.fontWeight = 500;
  spanChild1.appendChild(spanChild2)
  divParent.appendChild(spanChild1)

  spanChild2.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
       
    }
});

  

  return divParent;
}

const changeState = (state) => {
  let result = [];
  if (state !== 0 && !state) return state; // checking for flasey values
  if (typeof state === 'object') {



    for (const key in state) {
      if (Array.isArray(state[key])) {
        result.push(
          
          parseList(state[key], key))
        
      } else if (typeof state[key] !== 'object') {
        result.push(createDivEl(key, state[key]));
      } else {

 const cn = document.createElement("div");
        const header = document.createElement("div");
          header.innerHTML = key;
  header.style.fontSize = "1.5rem"
         cn.style.padding = '1rem 0'
  cn.appendChild(header)
  cn.appendChild(...(changeState(state[key])))

      result = [...result, cn]
      }
    }
  }

  return result;
};

export default changeState;
