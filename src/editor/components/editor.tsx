import * as d3 from 'd3'
// import { s} from 'd3-scale';
import * as React from 'react';

interface IEditorProps {
  simulation : any,
  svg : any
}

interface IEditorState {
  nodes : any[],
  links : any[],
  node : any,
  link : any,
  selectedNode : any,
  selectedLink : any
}

export class GraphEditor extends React.Component < IEditorProps,
IEditorState > {
  public state = {
    nodes: [],
    links: [],
    node: {},
    link: {},
    selectedNode: null,
    selectedLink: null
  }

  constructor(props) {
    super(props)
    const {simulation, svg} = props
    const state = {
      nodes: simulation.nodes(),
      links: simulation.links(),
      node: svg.selectAll(".node"),
      link: svg.selectAll(".link")
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

  protected tick = () => {
    const {link, node} = this.state
    link.attr("x1", (d : any) => {
      return d.source.x;
    }).attr("y1", (d : any) => {
      return d.source.y;
    }).attr("x2", (d : any) => {
      return d.target.x;
    }).attr("y2", (d : any) => {
      return d.target.y;
    })

    node.attr("cx", (d : any) => {
      return d.x;
    }).attr("cy", (d : any) => {
      return d.y;
    });
  }

  protected spliceLinksForNode = (node : any) => {
    const {links} = this.state;
    const toSplice = links.filter((l : any) => {
      return (l.source === node) || (l.target === node);
    });
    toSplice.map((l) => {
      links.splice(links.indexOf(l), 1);
    });
  }

  protected keydown = () => {
    const {selectedNode, selectedLink} = this.state
    if (!selectedNode && !selectedLink) {
      return;
    }
    switch (d3.event.keyCode) {
      case 8: // backspace
      case 46:
        { // delete
          if (selectedNode) {
            nodes.splice(nodes.indexOf(selectedNode), 1);
            spliceLinksForNode(selectedNode);
          } else if (selectedLink) {
            links.splice(links.indexOf(selectedLink), 1);
          }
          selectedLink = null;
          selectedNode = null;
          redraw();
          break;
        }
    }
  }
}
