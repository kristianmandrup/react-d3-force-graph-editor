import * as React from 'react';

// redraw force layout
export class ForceGraph extends React.Component < {} > {

  redraw = () {
    link = link.data(links);

    link
      .enter()
      .insert("line", ".node")
      .attr("class", "link")
      .on("mousedown", function (d) {
        mousedownLink = d;
        selectedLink = d;
        selectedNode = null;
        redraw();
      });

    link
      .exit()
      .remove();

    link.classed("link_selected", function (d) {
      return d === selectedLink;
    });

    node = node.data(nodes);

    node
      .enter()
      .insert("circle")
      .attr("class", "node")
      .attr("r", 5)
      .on("mousedown", function (d) {
        mousedownNode = d;
        selectedNode = d;
        selectedLink = null;
        redraw();
      })
      .on("mouseup", function (d) {
        selectedNode = d;
        mouseupNode = d;
        redraw();
      })
      .transition()
      .duration(750)
      .ease("elastic")
      .attr("r", 6.5);

    node
      .exit()
      .transition()
      .attr("r", 0)
      .remove();

    node.classed("node_selected", function (d) {
      return d === selectedNode;
    });

    if (d3.event) {
      // prevent browser's default behavior
      d3
        .event
        .preventDefault();
    }

    force.start();

  }
}
