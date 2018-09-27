import * as d3 from 'd3'
import {defaults} from './defaults'

export const setup = ({
  keydown = defaults.keydown
}) => {
  // add keyboard callback
  d3
    .select(window)
    .on('keydown', keydown);

}
