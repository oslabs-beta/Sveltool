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
      parseObjects(list[i], child);
    } else {
      child.innerText = list[i];
    }

    parent.appendChild(child);
  }

  return parent;
}

function createDivEl(key, value) {
  const el = document.createElement('div');
  el.innerText = `${key}: ${value}`;
  return el;
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
      } else result.push(changeState(state[key])); // nested objects and arrays
    }
  }

  console.log('result', result);
  return result;
};

export default changeState;
