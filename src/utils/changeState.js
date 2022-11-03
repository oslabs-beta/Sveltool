//iterate through data recursively
//the data that we're pulling is from props display view

const componentSearch = (d, sourceData) => {
  let resultData;

  if (sourceData.name === d) {
    resultData = { props: sourceData.props, state: sourceData.state };
    return resultData;
  }

  //if it's not root component that was clicked --> if root component has children, then iterate through children
  if (sourceData && sourceData.children) {
    for (let i = 0; i < sourceData.children.length; i++) {
      //recursively call component search to see if sourceData.children[i] has children
      let recursive = componentSearch(d, sourceData.children[i]);
      if (recursive) return recursive;
    }
  }
  return null;
};

function createContainerEl() {
  const containerDiv = document.createElement('div');
  containerDiv.style.padding = '1rem 0';

  return containerDiv;
}

function parseObjects(state, parent) {
  for (const key in state) {
    const child = createDivEl(key, state[key]);
    parent.appendChild(child);
  }
}

function parseList(list, heading) {
  const container = createContainerEl();
  const header = document.createElement('div');

  const parent = document.createElement('ul');
  const footer = document.createElement('div');
  footer.innerHTML = `]`;
  footer.style.fontSize = '1.5rem';

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

    child.style.padding = '1rem 1rem 0 1rem';
    parent.appendChild(child);
  }

  header.innerHTML = `${heading} [`;
  header.style.fontSize = '1.5rem';

  container.appendChild(header);
  container.appendChild(parent);
  container.appendChild(footer);
  return container;
}

function createDivEl(key, value) {
  const divParent = document.createElement('div');
  const spanChild = document.createElement('span');
  const inputValue = document.createElement('input');
  const inputKey = document.createElement('div');

  inputKey.innerHTML = `${key}: `;

  spanChild.style.display = 'flex';
  spanChild.style.gap = '2%';
  spanChild.style.fontSize = '12px';
  spanChild.style.fontWeight = 500;

  inputValue.value = value;
  inputValue.style.color = '#40b3ff';
  inputValue.style.background = 'transparent';
  inputValue.style.border = 'none';
  inputValue.style.outline = 'none';
  inputValue.style.width = '-webkit-fill-available';
  inputValue.style.fontSize = '12px';
  inputValue.style.fontWeight = 500;
  spanChild.appendChild(inputKey);
  spanChild.appendChild(inputValue);
  divParent.appendChild(spanChild);

  inputValue.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.blur();
    }
  });

  inputValue.addEventListener('onChange', function (event) {});

  return divParent;
}

const changeState = (state, nested = false) => {
  let result = [];

  const uniContainer = createContainerEl();
  const header = document.createElement('div');
  const footer = document.createElement('div');
  header.style.fontSize = '1.5rem';
  footer.style.fontSize = '1.5rem';
  if (!nested) {
    uniContainer.appendChild(header);
  }

  if (state !== 0 && !state) return state;
  if (typeof state === 'object') {
    for (const key in state) {
      if (Array.isArray(state[key])) {
        result.push(parseList(state[key], key));
      } else if (typeof state[key] !== 'object') {
        const div = createDivEl(key, state[key]);
        div.style.padding = '0 1rem 0 1rem';
        uniContainer.appendChild(div);
      } else {
        const container = createContainerEl();
        const header = document.createElement('div');
        header.innerHTML = `${key} {`;
        header.style.fontSize = '1.5rem';

        const footer = document.createElement('div');
        footer.innerHTML = `}`;
        footer.style.fontSize = '1.5rem';

        container.appendChild(header);
        container.appendChild(...changeState(state[key], true));

        container.appendChild(footer);

        result.push(container);
      }
    }

    if (uniContainer.childNodes.length > 1) {
      if (!nested) {
        uniContainer.appendChild(footer);
      }
      result.push(uniContainer);
    }
  }

  return result;
};

export default changeState;
