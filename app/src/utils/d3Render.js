import * as d3 from 'd3';

/*jshint esversion: 6 */
(function () {
    "use strict";
  })();
  
  let tree = d3.tree;
  let hierarchy = d3.hierarchy;
  let select = d3.select;
  let data = {
    name: "app",
    children: [
      {
        name: "navbar",
        children: [
          {
            name: "logo"
          },
          {
            name: "title"
          },
          {
            name: "signin"
          },
          {
            name: "signup"
          }
        ]
      },
      {
        name: "content",
        children: [
          {
            name: "test1",
            children: [
              {
                name: "test1a"
              },
              {
                name: "test1b"
              },
              {
                name: "test1c"
              }
            ]
          },
          {
            name: "test2",
            children: [
              {
                name: "test2a"
              },
              {
                name: "test2b"
              },
              {
                name: "test2c"
              }
            ]
          }
        ]
      }
    ]
  };
  
  class MyTree {
    constructor() {
        this.margin = { left: null, right: null, top:null, bottom:null };
        this.width = null;
        this.height = null;
        this.barHeight = null;
        this.barWidth = null;
        this.i = 0;
        this.duration = null
        this.tree = null;
        this.root = null;
        this.svg = null;
    }
  
 
  
    $onInit(d3El) {
      this.margin = { top: 20, right: 10, bottom: 20, left: 10 };
      this.width = 1400 - this.margin.right - this.margin.left;
      this.height = 800 - this.margin.top - this.margin.bottom;
      this.barHeight = 20;
      this.barWidth = this.width * 0.8;
      this.i = 0;
      this.duration = 750;
      this.tree = tree().size([this.width, this.height]);
      // this.tree = tree().nodeSize([0, 30]);
  
      this.tree = tree().nodeSize([0, 30]);
      this.root = this.tree(hierarchy(data));
      this.root.each((d) => {
        // @ts-ignore
        d.name = d.id; //transferring name to a name variable
        // @ts-ignore
        d.id = this.i; //Assigning numerical Ids
        this.i++;
      });
      // @ts-ignore
      this.root.x0 = this.root.x;
      // @ts-ignore
      this.root.y0 = this.root.y;
      this.svg = select(d3El)
        .append("svg")
        .attr("width", this.width + this.margin.right + this.margin.left)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")"
        );
  
      // this.root.children.forEach(this.collapse);
      this.update(this.root);
    }
  
    connector = function (d) {
      //curved
      /*return "M" + d.y + "," + d.x +
        "C" + (d.y + d.parent.y) / 2 + "," + d.x +
        " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
        " " + d.parent.y + "," + d.parent.x;*/
      //straight
      return "M" + d.parent.y + "," + d.parent.x + "V" + d.x + "H" + d.y;
    };
  
    collapse = (d) => {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(this.collapse);
        d.children = null;
      }
    };
  
    click = (d) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      this.update(d);
    };
  
    update = (source) => {
      this.width = 800;
  
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
  
      d3.select("svg")
        .transition()
        .duration(this.duration)
        .attr("height", this.height);
  
      // Update the nodes…
      // @ts-ignore
      let node = this.svg.selectAll("g.node").data(nodesSort, function (d) {
        // @ts-ignore
        return d.id || (d.id = ++this.i);
      });
  
      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function () {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", this.click);
  
      nodeEnter
        .append("circle")
        .attr("r", 5)
        // @ts-ignore
        .style("fill", function (d) {
          return d._children ? "black" : "grey";
        });
  
      nodeEnter
        .append("text")
        // @ts-ignore
        .attr("x", function (d) {
          return d.children || d._children ? 10 : 10;
        })
        .attr("dy", ".35em")
        // @ts-ignore
        .attr("text-anchor", function (d) {
          return d.children || d._children ? "start" : "start";
        })
        // @ts-ignore
        .text(function (d) {
          if (d.data.name.length > 20) {
            return d.data.name.substring(0, 20) + "...";
          } else {
            return d.data.name;
          }
        })
        .style("fill-opacity", 1e-6);
  
      // @ts-ignore
      nodeEnter.append("svg:title").text(function (d) {
        return d.data.name;
      });
  
      // Transition nodes to their new position.
      let nodeUpdate = node.merge(nodeEnter).transition().duration(this.duration);
  
      // @ts-ignore
      nodeUpdate.attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
  
      nodeUpdate
        .select("circle")
        .attr("r", 5)
        // @ts-ignore
        .style("fill", function (d) {
          
          return d._children ? "black" : "grey";
        });
  
      nodeUpdate.select("text").style("fill-opacity", 1);
  
      // Transition exiting nodes to the parent's new position (and remove the nodes)
      var nodeExit = node.exit().transition().duration(this.duration);
  
      nodeExit
        // @ts-ignore
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();
  
      nodeExit.select("circle").attr("r", 1e-6);
  
      nodeExit.select("text").style("fill-opacity", 1e-6);
  
      // Update the links…
      // @ts-ignore
      var link = this.svg.selectAll("path.link").data(links, function (d) {
        // return d.target.id;
        var id = d.id + "->" + d.parent.id;
        return id;
      });
  
      // Enter any new links at the parent's previous position.
      let linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        // @ts-ignore
        .attr("d", (d) => {
          var o = {
            x: source.x0,
            y: source.y0,
            parent: { x: source.x0, y: source.y0 }
          };
          return this.connector(o);
        });
  
      // Transition links to their new position.
      link
        .merge(linkEnter)
        .transition()
        .duration(this.duration)
        .attr("d", this.connector);
  
      // // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(this.duration)
        // @ts-ignore
        .attr("d", (d) => {
          var o = {
            x: source.x,
            y: source.y,
            parent: { x: source.x, y: source.y }
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
  