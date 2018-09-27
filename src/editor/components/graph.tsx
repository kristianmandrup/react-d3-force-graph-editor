import * as d3 from 'd3'
import * as React from 'react';
import {
  IMousedown,
  ISelected,
  ILink,
  ILinks,
  INodes,
  INode,
  IMouseup,
  ISimulation
} from '../interfaces';

interface IForceGraphProps {
  link : ILink
  links : ILinks
  mousedown : IMousedown
  mouseup : IMouseup
  selected : ISelected
  nodes : INodes
  node : INode
  simulation : ISimulation
}

// redraw force layout
export class ForceGraph extends React.Component < IForceGraphProps > {

  public redraw = () => {
    const {link, links} = this.props
    const dataLink = link.data(links)
    const {
      simulation,
      mousedown,
      mouseup,
      selected,
      node,
      nodes
    } = this.props
    dataLink
      .enter()
      .insert('line', '.node')
      .attr('class', 'link')
      .on('mousedown', (d : any) => {
        mousedown.link = d
        selected.link = d
        selected.node = null
        this.redraw()
      })

    link
      .exit()
      .remove();

    link.classed('link_selected', (d : any) => {
      return d === selected.link;
    });

    const dataNode = node.data(nodes);

    dataNode
      .enter()
      .insert('circle')
      .attr('class', 'node')
      .attr('r', 5)
      .on('mousedown', (d : any) => {
        mousedown.node = d;
        selected.node = d;
        selected.link = null;
        // implicit re-render on state change redraw();
      })
      .on('mouseup', (d : any) => {
        selected.node = d;
        mouseup.node = d;
        // implicit re-render on state change redraw();
      })
      .transition()
      .duration(750)
      .ease('elastic')
      .attr('r', 6.5);

    node
      .exit()
      .transition()
      .attr('r', 0)
      .remove();

    node.classed('node_selected', (d : any) => {
      return d === selected.node;
    });

    if (d3.event) {
      // prevent browser's default behavior
      d3
        .event
        .preventDefault();
    }
    simulation.start();
  }
}
