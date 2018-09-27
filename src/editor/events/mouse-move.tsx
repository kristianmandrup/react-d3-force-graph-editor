import * as d3 from 'd3'
import {IMousedown, IDrag} from './interfaces'

interface IMousemove {
  mousedown : IMousedown
  dragged : true
  drag : IDrag,
  ctx : any
}

export class Mousemove {
  public mousedown : IMousedown
  public dragged : true
  public drag : IDrag

  constructor(config : IMousemove) {
    const {mousedown, drag} = config
    this.drag = drag
    this.mousedown = mousedown
  }

  public onEvent(e : any) {
    if (!this.mousedown.node) {
      return;
    }
    this.dragged = true;
    // update drag line
    this
      .drag
      .line
      .attr("x1", this.mousedown.node.x)
      .attr("y1", this.mousedown.node.y)
      .attr("x2", d3.mouse(e)[0])
      .attr("y2", d3.mouse(e)[1]);
  }
}
