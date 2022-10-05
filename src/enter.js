import { walk } from "svelte/compiler";

const enter = {
  enter(ASTnode, parent, prop, index) {
    console.log('AST Node ==> ', ASTnode);
  }
};

export default enter;