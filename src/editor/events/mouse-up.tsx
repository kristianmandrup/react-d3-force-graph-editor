import * as d3 from 'd3'
import {IMousedown, IDrag} from './interfaces'

interface IMouseupConfig {
  drag : IDrag
  mousedown : IMousedown,
  mouseup : IMouseup,
  selected : ISelected,
  nodes : INodes,
  links : ILinks,
  resetMouseConsts : () => any,
  ctx : any
}

export class Mouseup {
  public selected : ISelected
  public drag : IDrag
  public mousedown : IMousedown
  public mouseup : IMouseup
  public links : ILinks
  public nodes : INodes
  protected ctx : any
  protected resetMouseConsts : () => any

  constructor(config : IMouseupConfig) {
    const {
      selected,
      mousedown,
      mouseup,
      links,
      nodes,
      resetMouseConsts
    } = config
    this.selected = selected
    this.mousedown = mousedown
    this.mouseup = mouseup
    this.links = links
    this.nodes = nodes
    this.resetMouseConsts = resetMouseConsts
  }

  public onEvent() {
    // hide drag line
    this
      .drag
      .line
      .attr("class", "drag_line_hidden")

    if (this.mouseup.node === this.mousedown.node) {
      this.resetMouseConsts();
      return;
    }

    this.mouseup.node
      ? this.onMouseUp()
      : this.onMouseDown()

    // clear mouse event consts
    this.resetMouseConsts();

    // render this.redraw();
  }

  protected onMouseDown() {
    // add .node
    const point = d3.mouse(this.ctx)
    this.selected.node = {
      x: point[0],
      y: point[1]
    };
    this
      .nodes
      .push(this.selected.node)
    this.selected.link = null;

    this
      .links
      .push({source: this.mousedown.node, target: this.selected.node});
  }

  protected onMouseUp() {
    this.selected.link = {
      source: this.mousedown.node,
      target: this.mouseup.node
    };
    this
      .links
      .push(this.selected.link);

    this.selected.node = null;
  }
}
