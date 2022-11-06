import * as d3 from 'd3';
import { componentProps, componentState, currentComponent } from './store';

/*jshint esversion: 6 */
(function () {
  'use strict';
})();

let { tree, hierarchy, select } = d3;

class MyTree {
  constructor(data) {
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
    this.data = data;
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
    this.root = this.tree(hierarchy(this.data));

    this.root.each((d) => {
      d.name = d.id; //transferring name to a name letiable
      d.id = this.i; //Assigning numerical Ids
      this.i++;
    });
    this.root.x0 = this.root.x;
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

    if (this.root.children) {
      this.root.children.forEach(this.collapse);
    }
    this.update(this.root, colorScheme);
  }

  connector = function (d) {
    return 'M' + d.parent.y + ',' + d.parent.x + 'V' + d.x + 'H' + d.y;
  };

  collapse = (d) => {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(this.collapse);
      d.children = null;
    }
  };

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

    currentComponent.update(() => {
      return d.data.name;
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

    // Update the nodes
    let node = this.svg.selectAll('g.node').data(nodesSort, function (d) {
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

    nodeEnter
      .append('text')
      .attr('x', function (d) {
        return d.children || d._children ? 10 : 10;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'start' : 'start';
      })
      .text(function (d) {
        if (d.data.name && d.data.name.length > 20) {
          return d.data.name.substring(0, 20) + '...';
        } else {
          return d.data.name;
        }
      })
      .style('fill-opacity', 1e-6)
      .style('cursor', 'pointer');
    nodeEnter.append('svg:title').text(function (d) {
      return d.data.name;
    });

    // Transition nodes to their new position.
    let nodeUpdate = node.merge(nodeEnter).transition().duration(this.duration);
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
      .style('cursor', function (d) {
        return 'pointer';
      });

    nodeUpdate.select('text').style('fill-opacity', 1);

    // Transition exiting nodes to the parent's new position (and remove the nodes)
    let nodeExit = node.exit().transition().duration(this.duration);

    nodeExit
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('polygon').attr('points', function (d) {
      return '0 -5, 0 4, 7 0';
    });

    nodeExit.select('text').style('fill-opacity', 1e-6);

    // Update the links…
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

export default MyTree;
