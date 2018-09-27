// line displayed when dragging new nodes
export class DragLine {
  constructor(svg : any) {
    svg
      .append('line')
      .attr('class', 'drag_line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0)
  }
}
