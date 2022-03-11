import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

import { formatPortfolioName } from '../Helpers';

function PieChart(props) {

  const graphRef = useRef();

  function drawChart() {
    let data = props.data
    d3.select(".svg-wrapper").remove();

    const width  = props.width;
    const height = props.height;
    const margin = props.margin;
    let radius = Math.min(width, height) / 2  - margin;
    let innerRadius = props.innerRadius;

    const svg  = d3.select(graphRef.current)
    .attr("width", width)
    .attr("height", height)
    .append('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr("class","svg-wrapper")
      .attr('viewBox', '0 0 ' + width + ' ' + width )
      .append("g")
        .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

    svg.append("text")
        .attr("x", "0")
        .attr("y", "0em")
        .style("text-anchor", "middle")
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "-0em")
        .html("INVESTMENT")
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "1.5em")
        .html("PORTFOLIO");

    let pie = d3.pie()
        .value( d => d.value )
    
    let filteredData = Object.entries(data).map(item => {
      return {
        key: item[0],
        value: item[1]
      }
    })
    .filter(category => { // Hide categories with 0 as value
      return category.value;
    });
    let data_ready = pie(filteredData)

    let arcGenerator = d3.arc()
    .innerRadius(innerRadius)  // This is the size of the donut hole
    .outerRadius(radius);

    svg
    .selectAll('whatever')
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill',  (d) =>  props.colors[d.index] )
      .attr("stroke", "#fff")
      .style("stroke-width", "2")
      .style("opacity", "0.8")

    let g = svg.selectAll("circle")
      .data(data_ready)
      .enter()
      .append('g')
        .attr("class", "arc");
      
    g.append("path")
      .attr("d", arcGenerator)
      .attr("fill", function(d, i){
        return props.colors[i]
      });
    g.on('mouseenter', function(d) {
        d3.select(this).style("opacity", "0.85");
        if (data ) {
          d3.select(this).select('text')
            .text(function(d){
                return d.data.value + "%";
            })
        }
      })
    g.on('mouseleave', function(d) {
      d3.select(this).style("opacity", "1");
      if (data) {
        d3.select(this).select('text')
          .text(function(d){
              return formatPortfolioName(d.data.key);
          })
      }
    })
    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(function(d,i) { 
          return props.defaultLabel ? 
            props.defaultLabel :
            formatPortfolioName(d.data.key);
        });
 }

 useEffect(() => {
    drawChart()
  }, [props.data])
  
 return (
    <svg ref={graphRef} ></svg>
  );
}

export default PieChart;
