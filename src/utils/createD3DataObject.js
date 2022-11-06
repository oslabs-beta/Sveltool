/**
 * 
 * Takes in the root component and the dependency definitions object.
 * Builds the output json to send to the D3 renderer.
 *  
 **/

function D3DataObject(root = '<App />', dependencies = {}, state = {}) {
  this.getData = (component = root, props) => {
    const componentData = {};
    componentData.name = component;
    if (props) componentData.props = props;
    if (state[component]) componentData.state = state[component];
    if (dependencies[component])
      componentData.children = dependencies[component].map((dependency) =>
        this.getData(dependency.name, dependency.props)
      );
    return componentData;
  };
  this.data = this.getData();
}

export default D3DataObject;
