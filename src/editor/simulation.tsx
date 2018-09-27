import * as d3 from 'd3'
import {defaults} from './defaults'

export class Simulation {
  constructor({
    nodes = defaults.nodes,
    size = defaults.size,
    ticked = defaults.ticked
  } = {}) {
    if (!Array.isArray(nodes)) {
      throw new Error('simulation missing nodes')
    }
    d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(size.width / 2, size.height / 2))
      .on('tick', ticked);
  }
}
