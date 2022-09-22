//iterate through data recursively
//the data that we're pulling is from props display view

function checkStateType(data) {
// expecting only objects
     for (const key in state) {

      }
    
}



function createList(list) {
  const parent = document.createElement('ul');
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0 && !list[i]) continue;
      const child = document.createElement('li');
    
    parent.appendChild(child);
  }
  console.log('PARRREEENT===>', JSON.stringify(parent));
  return parent;
}

function createDivEl(key, value) {
  const el = document.createElement('div');
  el.innerHTML = `${key}: ${value}`;
  return el;
}

const changeState = (state) => {
  console.log('state==>', state);
  const result = [];
  if (state !== 0 && !state) return state; // checking for flasey values
  if (typeof state === 'object') {
    for (const key in state) {
      if (Array.isArray(state[key])) {
        result.push(createList(state[key]));
      } else if (typeof state[key] !== 'object') {
        result.push(createDivEl(key, state[key]));
      } else result.push(changeState(state[key])); // nested objects and arrays
    }
  }

  console.log('result', result);
  return result;
};
// changeState('changeState')

export default changeState;
