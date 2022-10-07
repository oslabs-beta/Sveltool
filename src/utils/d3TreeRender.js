import * as d3 from 'd3';
import { componentProps, componentState } from './store';

/*jshint esversion: 6 */
(function () {
  'use strict';
})();

let tree = d3.tree;
let hierarchy = d3.hierarchy;
let select = d3.select;
// let data = {
//   name: "app",
//   props: {
//     firstName: "Meow",
//     lastName: "Merry",
//   },
//   state: {
//     stateFirstName: "Meow is first state",
//     stateLastName: "Merry is second state",
//   },
//   children: [
//     {
//       name: "navbar",
//       props: {
//         navBarProps: "We're in the navBar props",
//         navBarProps2: "We are in the navBar props again",
//       },
//       state: {
//         navBarState: "Here we have the navbarState",
//       },
//       children: [
//         {
//           name: "logo",
//           children: false,
//           props: {
//             logoProps: "logoProps",
//             logoProps2: "logoProps2",
//           },
//           state: {
//             logoState: "logoState",
//           },
//         },
//         {
//           name: "title",
//           children: false,
//           props: {
//             titleProps: "titleProps",
//             titleProps2: "titleprops2",
//           },
//           state: {
//             titleState: "titleState",
//           },
//         },
//         {
//           name: "signin",
//           children: false,
//           props: {
//             signInProps: "signInProp",
//             signInProps2: "Hi I'm signing in",
//           },
//           state: {
//             SignInState: "signInState",
//           },
//         },
//         {
//           name: "signup",
//           children: false,
//           props: {
//             signUpProps: "signUpProp",
//             signUpProps2: "Hi I'm signing up",
//           },
//           state: {
//             SignUpState: "signUpState",
//           },
//         },
//       ],
//     },
//     {
//       name: "content",
//       props: { prop1: "contentProps" },
//       state: { state1: "contentState" },
//       children: [
//         {
//           name: "test1",
//           props: { contentProp: "contentProp" },
//           state: { contentState: "contentState" },
//           children: [
//             {
//               name: "test1a",
//               props: { test1aprop: "test1aProp" },
//               state: { test1astate: "test1aState" },
//             },
//             {
//               name: "test1b",
//               props: { test1bProp: "test1bProp" },
//               state: { test1bState: "test1bState" },
//             },
//             {
//               name: "test1c",
//               props: { test1cProp: "test1cProp" },
//               state: { test1cState: "test1cState" },
//             },
//           ],
//         },
//         {
//           name: "test2",
//           props: { test2props: "test2Props" },
//           state: { test2state: "test2State" },
//           children: [
//             {
//               name: "test2a",
//               props: { test2aprop: "test2a_Props" },
//               state: { test2astate: "test2a_State" },
//             },
//             {
//               name: "test2b",
//             },
//             {
//               name: "test2c",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
const data = {
  name: 'App',
  state: {
    person: {
      name: 'Todo List',
      age: 20,
      description: `Let's get play!`,
    },
  },
  children: [
    {
      name: 'Header',
      // children: [
      //   {
      //     name: "Title",
      //     props: { title: "Header", item: "To do app!" },
      //     state: { title: "Todo", item: "What will you do each day" },
      //   },
      // ],
      props: {
        name: 'Todo List',
        age: 20,
        description: `Let's get play!`,
      },
    },
    {
      name: 'TodoList',
      props: {
        item: { text: 'Write my first post1', status: true },
        // todoList: [
        //   { text: "Write my first post", status: true },
        //   { text: "Upload the post to the blog", status: false },
        //   { text: "Publish the post at Facebook", status: false },
        // ],
      },
      state: {
        newItem: 'Work on OSP!!',
      },
      children: [
        {
          name: 'ListItem',
          props: {
            item: { text: 'Publish the post at Facebook', status: true },
            // todoList: [
            //   { text: "Write my first post", status: true },
            //   { text: "Upload the post to the blog", status: false },
            //   { text: "Publish the post at Facebook", status: true },
            //   { text: "Post at somethingggggg", status: false },
            // ],
            index: 0,
          },
        },
        {
          name: 'ListItem',
          props: {
            item: { text: 'Upload the post to the blog3', status: false },
            // todoList: [
            //   { text: "Write my first post", status: true },
            //   { text: "Upload the post to the blog", status: false },
            //   { text: "Publish the post at Facebook", status: false },
            //   { text: "Publish the post at Twitter", status: false },

            // ],
            index: 1,
          },
        },
        {
          name: 'ListItem',
          props: {
            item: { text: 'Publish the post at Facebook', status: false },
            // todoList: [
            //   { text: "Write my first post", status: true },
            //   { text: "Upload the post to the blog", status: false },
            //   { text: "Publish the post at Facebook", status: false },
            // ],
            index: 2,
          },
        },
      ],
    },
  ],
};

class MyTree {
  constructor() {
    this.margin = { left: null, right: null, top: null, bottom: null };
    this.width = null;
    this.height = null;
    this.barHeight = null;
    this.barWidth = null;
    this.i = 0;
    this.duration = null;
    this.tree = null;
    this.root = null;
    this.svg = null;
    this.colorScheme = null;
    this.component = '';
  }

  $onInit(d3El, width, height, colorScheme) {
    this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
    this.width = width - this.margin.right - this.margin.left;
    this.height = height - this.margin.top - this.margin.bottom;
    this.barHeight = 20;
    this.barWidth = this.width * 0.8;
    this.i = 0;
    this.duration = 600;
    this.tree = tree().size([this.width, this.height]);
    // this.tree = tree().nodeSize([0, 30]);
    this.component = '';
    this.tree = tree().nodeSize([0, 30]);
    this.root = this.tree(hierarchy(data));

    this.root.each((d) => {
      // @ts-ignore
      d.name = d.id; //transferring name to a name letiable
      // @ts-ignore
      d.id = this.i; //Assigning numerical Ids
      this.i++;
    });
    // @ts-ignore
    this.root.x0 = this.root.x;
    // @ts-ignore
    this.root.y0 = this.root.y;

    this.svg = select(d3El)
      .append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    this.root.children.forEach(this.collapse);
    this.update(this.root, colorScheme);
  }

  connector = function (d) {
    // //curved
    // return (
    //   "M" +
    //   d.y +
    //   "," +
    //   d.x +
    //   "C" +
    //   (d.y + d.parent.y) / 2 +
    //   "," +
    //   d.x +
    //   " " +
    //   (d.y + d.parent.y) / 2 +
    //   "," +
    //   d.parent.x +
    //   " " +
    //   d.parent.y +
    //   "," +
    //   d.parent.x
    // );
    //straight

    return 'M' + d.parent.y + ',' + d.parent.x + 'V' + d.x + 'H' + d.y;
  };

  collapse = (d) => {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(this.collapse);
      d.children = null;
    }
  };

  //DONT NEED THIS FUNCTION -- BUT THIS IS HOW IT WORKS UNDERHOOD//
  // //passing in component clicked on and root component
  // componentSearch = (d, sourceData) => {
  //   let resultData;

  //   if (sourceData.name === d) {
  //     resultData = { props: sourceData.props, state: sourceData.state };
  //     return resultData;
  //   }

  //   //if it's not root component that was clicked --> if root component has children, then iterate through children
  //   if (sourceData.children) {
  //     for (let i = 0; i < sourceData.children.length; i++) {
  //       //recursively call component search to see if sourceData.children[i] has children
  //       let recursive = this.componentSearch(d, sourceData.children[i]);
  //       if (recursive) return recursive;
  //     }
  //   }
  //   return null;
  // };

  click = (d) => {
    d = d.target.__data__;
    let props;
    componentProps.update(() => {
      props = d.data.props;

      return props;
    });
    componentState.update((state) => {
      state = d.data.state;
      return state;
    });

    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }

    this.update(d, this.colorScheme);
  };

  update = (source, colorScheme) => {
    this.width = 800;
    this.colorScheme = colorScheme ? colorScheme : this.colorScheme;
    // Compute the new tree layout.
    let nodes = this.tree(this.root);
    let nodesSort = [];
    nodes.eachBefore(function (n) {
      nodesSort.push(n);
    });
    this.height = Math.max(
      500,
      nodesSort.length * this.barHeight + this.margin.top + this.margin.bottom
    );
    let links = nodesSort.slice(1);
    // Compute the "layout".
    nodesSort.forEach((n, i) => {
      n.x = i * this.barHeight;
    });

    d3.select('svg')
      .transition()
      .duration(this.duration)
      .attr('height', this.height);

    // Update the nodes…
    // @ts-ignore
    let node = this.svg.selectAll('g.node').data(nodesSort, function (d) {
      // @ts-ignore
      return d.id || (d.id = ++this.i);
    });

    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function () {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', (e) => {
        this.click(e);
      });

    nodeEnter
      .append('polygon')
      .attr('points', function (d) {
        return d._children ? '0 -5, 0 4, 7 0' : '0 -1, 5 5, 9 -1';
      })
      .style('cursor', function (d) {
        return 'pointer';
      })
      .attr('fill', '#ff3e00');

    // @ts-ignore

    nodeEnter
      .append('text')
      // @ts-ignore
      .attr('x', function (d) {
        return d.children || d._children ? 10 : 10;
      })
      .attr('dy', '.35em')
      // @ts-ignore
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'start' : 'start';
      })
      // @ts-ignore
      .text(function (d) {
        if (d.data.name.length > 20) {
          return d.data.name.substring(0, 20) + '...';
        } else {
          return d.data.name;
        }
      })
      .style('fill-opacity', 1e-6)
      .style('cursor', 'pointer');

    // @ts-ignore
    nodeEnter.append('svg:title').text(function (d) {
      return d.data.name;
    });

    // Transition nodes to their new position.
    let nodeUpdate = node.merge(nodeEnter).transition().duration(this.duration);

    // @ts-ignore
    nodeUpdate.attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')';
    });

    nodeUpdate
      .select('polygon')
      .attr('points', function (d) {
        return d._children ? '0.9 -5, 0.9 4, 7 0' : '0 -3, 5 2, 9 -3';
      })
      .attr('fill', '#ff3e00')
      .attr('height', '50px')
      // @ts-ignore
      .style('cursor', function (d) {
        return 'pointer';
      });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position (and remove the nodes)
    let nodeExit = node.exit().transition().duration(this.duration);

    nodeExit
      // @ts-ignore
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('polygon').attr('points', function (d) {
      return '0 -5, 0 4, 7 0';
    });

    nodeExit.select('text').style('fill-opacity', 1e-6);

    // Update the links…
    // @ts-ignore
    let link = this.svg.selectAll('path.link').data(links, function (d) {
      // return d.target.id;
      let id = d.id + '->' + d.parent.id;
      return id;
    });

    // Enter any new links at the parent's previous position.
    let linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      // @ts-ignore
      .attr('d', (d) => {
        let o = {
          x: source.x0,
          y: source.y0,
          parent: { x: source.x0, y: source.y0 },
        };
        return this.connector(o);
      });

    // Transition links to their new position.
    link
      .merge(linkEnter)
      .transition()
      .duration(this.duration)
      .attr('d', this.connector);

    // // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition()
      .duration(this.duration)
      // @ts-ignore
      .attr('d', (d) => {
        let o = {
          x: source.x,
          y: source.y,
          parent: { x: source.x, y: source.y },
        };
        return this.connector(o);
      })
      .remove();

    // Stash the old positions for transition.
    nodesSort.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };
}

let myTree = new MyTree();

export default myTree;
