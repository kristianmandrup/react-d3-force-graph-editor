import * as d3 from 'd3'
import {defaults} from './defaults'
// init svg
export const createSvg = ({
  size = defaults.size,
  events = {}
} : any = {}) : any => {
  return d3
    .select('body')
    .append('svg')
    .attr('width', size.width)
    .attr('height', size.height)
    .on('mousemove', events.mousemove)
    .on('mousedown', events.mousedown)
    .on('mouseup', events.mouseup);
}

// line displayed when dragging new nodes
export const createDragLine = (svg : any) => svg
  .append('line')
  .attr('class', 'drag_line')
  .attr('x1', 0)
  .attr('y1', 0)
  .attr('x2', 0)
  .attr('y2', 0)
