
function D3DataObject (root = '<App />', dependencies = {}, props = {}, state = {}) {
  
  this.getData = (component = root) => {
    const componentData = {};
    componentData.name = component;
    if (props[component]) componentData.props = props[component];
    if (state[component]) componentData.state = state[component];
    if (dependencies[component]) componentData.children = dependencies[component].map(dependency => this.getData(dependency));
    return componentData;
  }

  this.data = this.getData();

}

export default D3DataObject;
