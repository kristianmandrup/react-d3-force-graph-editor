import * as d3 from 'd3'
import {defaults} from './defaults'
// init svg
export class Svg {
  constructor({
    size = defaults.size,
    events = {}
  } : any = {}) {
    return d3
      .select('body')
      .append('svg')
      .attr('width', size.width)
      .attr('height', size.height)
      .on('mousemove', events.mousemove)
      .on('mousedown', events.mousedown)
      .on('mouseup', events.mouseup);
  }
}
