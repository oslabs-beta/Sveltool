import { parse, walk } from 'svelte/compiler'; 
import enter from "./enter.js";

function parser (arrContent) {
  const componentNames = [];
  while (arrContent.length) {
    const component = arrContent.pop();
    const ast = parse(component);
    walk(ast, enter);
  }
}

export default parser;