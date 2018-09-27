export const createMouseDown = ({mousedown, selected, drag, redraw} : any = {}) => {
  return () => {

    if (!mousedown.node && !mousedown.link) {
      selected.node = null;
      selected.link = null;
      redraw();
      return;
    }

    if (mousedown.node) {
      // reposition drag line
      drag
        .line
        .attr("class", ".link")
        .attr("x1", mousedown.node.x)
        .attr("y1", mousedown.node.y)
        .attr("x2", mousedown.node.x)
        .attr("y2", mousedown.node.y);
    }

    redraw();
  }
}
