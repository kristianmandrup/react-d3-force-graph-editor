import * as d3 from 'd3'
// import { s} from 'd3-scale';
import * as React from 'react';
import {ILinks, ILink, INodes, INode, ISelected} from '../interfaces';

interface IEditorProps {
  simulation : any,
  svg : any
}

interface IEditorState {
  // nodes : INodes, links : ILinks,
  nodes : any[] | null
  links : any[] | null
  node : INode | null,
  link : ILink | null,
  selected : ISelected | null
}

export class GraphEditor extends React.Component < IEditorProps,
IEditorState > {
  public state = {
    nodes: null,
    links: null,
    node: null,
    link: null,
    selected: null
  }

  constructor(props : any) {
    super(props)
    const {simulation, svg} = props
    const state = {
      nodes: simulation.nodes(),
      links: simulation.links(),
      node: svg.selectAll('.node'),
      link: svg.selectAll('.link')
    }
    // get layout properties
    this.setState(state)
  }

  public render() {
    return <div>Editor</div>
  }

  protected renderSvg = () => {
    const {svg} = this.props
    // focus on svg?
    svg
      .node()
      .focus();

  }

  protected setLink(link : ILink) {
    link.attr('x1', (d : any) => {
      return d.source.x;
    }).attr('y1', (d : any) => {
      return d.source.y;
    }).attr('x2', (d : any) => {
      return d.target.x;
    }).attr('y2', (d : any) => {
      return d.target.y;
    })
  }

  protected setNode(node : INode) {
    node.attr('cx', (d : any) => {
      return d.x;
    }).attr('cy', (d : any) => {
      return d.y;
    });
  }

  protected tick = () => {
    const {link, node} = this.state
    if (link) {
      this.setLink(link)
    }

    if (node) {
      this.setNode(node)
    }
  }

  protected spliceLinksForNode = (node : any) => {
    const {links} = this.state;
    const toSplice = links.filter((link : any) => {
      return (link.source === node) || (link.target === node);
    });
    toSplice.map((link) => {
      links.splice(links.indexOf(link), 1);
    });
  }

  protected redraw() {
    console.log('redraw')
  }

  protected keydown = () => {
    const selected : any = this.state.selected || {}
    if (!selected.node && !selected.link) {
      return
    }
    switch (d3.event.keyCode) {
      case 8: // backspace
      case 46:
        this.onDelete(selected)
    }
  }

  protected onDelete = (selected : ISelected) => {

    // delete never: see
    // https://blog.mariusschulz.com/2016/11/18/typescript-2-0-the-never-type
    if (selected.node) {} else if (selected.link) {}

    selected.link = null;
    selected.node = null;
    this.redraw();
    break;
  }

  protected onDeleteLink(link : ILink) {
    if (!node) {
      return
    }
    const {links} = this.state
    const index = links.indexOf(link)
    links.splice(index, 1);
  }

  protected onDeleteNode(node : INode) {
    if (!node) {
      return
    }
    const {nodes} = this.state
    const index = nodes.indexOf(node)
    nodes.splice(index, 1);
    this.spliceLinksForNode(node);
  }
}
