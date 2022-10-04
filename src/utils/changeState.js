//iterate through data recursively
//the data that we're pulling is from props display view

function parseObjects(state, parent) {
  for (const key in state) {
    parent.appendChild(createDivEl(key, state[key]));
  }
  
}

function parseList(list) {
  const parent = document.createElement('ul');

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
 
  console.log('parseList parent=>',parent) 
  return parent;
}

function createDivEl(key, value) {
  const divParent = document.createElement('div'); 
  const spanChild1 = document.createElement('span');
  const spanChild2 = document.createElement('span');
  spanChild1.innerText = `${key} : `
  spanChild1.style.fontSize = '12px'
  spanChild1.style.fontWeight = 500;
  spanChild2.innerText = value;
  spanChild2.style.color = '#40b3ff';
  spanChild2.style.fontSize = '12px'
  spanChild2.style.fontWeight = 500;
  spanChild1.appendChild(spanChild2)
  divParent.appendChild(spanChild1)
  return divParent;
}

const changeState = (state) => {
  const result = [];
  if (state !== 0 && !state) return state; // checking for flasey values
  if (typeof state === 'object') {
    for (const key in state) {
      if (Array.isArray(state[key])) {
        result.push(parseList(state[key]));
      } else if (typeof state[key] !== 'object') {
        result.push(createDivEl(key, state[key]));
      } else result.concat(changeState(state[key])); // nested objects and arrays result = [...result, ...(changeState(state[key]))];
    }
  }

  // console.log('result', result);
  return result;
};

export default changeState;
