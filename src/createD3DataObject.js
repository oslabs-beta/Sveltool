console.log('Quokka Working');

function D3DataObject (root = '<App />', dependencies = {}, props = {}, state = {}) {
  
  this.getData = (component = root) => {
    const componentData = {};
    componentData.name = component;
    if (props[component]) componentData.props = props[component];
    if (state[component]) componentData.state = state[component];
    if (dependencies[component]) componentData.children = dependencies[component].map(dependency => this.getData(dependency));
    return componentData;
  }

  const data = this.getData();

  this.setData = (newRoot = root, newDependencies = dependencies, newProps = props, newState = state) => {
    root = newRoot;
    dependencies = newDependencies;
    props = newProps;
    state = newState;
    data = this.getData();
    const previousTimeStamp = this.storeData();
    return {previousData: this.getPreviousData(previousTimeStamp), newData: data};
  };

  const dataStore = new Map();

  this.storeData = () => {
    const date = new Date();
    dataStore.set(date.toISOString(), JSON.parse(JSON.stringify(data)));
    return date.toISOString();
  };

  this.getPreviousData = (date = null) => {
    if (!date) return dataStore;
    return dataStore.get(date);
  };
}


const testDependencies = {
  '<App />': ['<List />', '<List />', '<Footer />'],
  '<List />': ['<Test />'],
  '<Test />': ['<DeepTest />'],
};
const testProps = {
  '<Footer />': {
    creator: 'DragonZSG',
    copyrightDate: 2022,
  },
};
const testState = {
  '<List />': {
    li1: 'Make a svelte app',
    li2: 'Put it in dev mode',
  },
};

let test1 = new D3DataObject(
  '<App />',
  testDependencies,
  testProps,
  testState
);

// const store1 = test1.storeData()
// console.log(test1.getPreviousData());
// // test1.root = '<Main />';
// console.log(test1.getData('<List />'));

// test1 = new D3DataObject(
//   '<Test />',
//   testDependencies,
//   testProps,
//   testState
// );
// const store2 = test1.storeData()
// console.log(test1.getPreviousData(store1));

export default D3DataObject;
