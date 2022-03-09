import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from "d3";

import { formatPortfolioName } from '../Helpers';

const colors = [ '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c' ];
const defaultValues = {bonds: 20, largeCap: 20, mideCap: 20, foreign: 20, smallCap: 20};

function RiskLevelDescriptionGraph() {

  const currentLevelData = useSelector((state) => {
    return state.riskLevel.riskLevels.filter(riskLevel => {
      return state.riskLevel.level === riskLevel.level;
    })
    .map(riskLevelb => {
      let riskLevelbCopy = {...riskLevelb}
      delete riskLevelbCopy.level;
      return riskLevelbCopy;
    })
  })[0];

  const riskLevel = useSelector((state) => {
    return state.riskLevel.level;
  })

  const graphRef = useRef();

  // DrawChart 
  function drawChart(data){
    d3.select(".svg-wrapper").remove();

    const width  = 500;
    const height = width;
    const margin = 0;
    let radius = Math.min(width, height) / 2  - margin;
    let innerRadius = 120;

    // Create SVG
    const svg  = d3.select(graphRef.current)
    // svg
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

    // Donut partition  
    svg
    .selectAll('whatever')
    // .data(data_ready)
    // .enter()
    .append('path')
      .attr('d', arcGenerator)
      .attr('fill',  (d) =>  colors[d.index] )
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
        return colors[i]
      });
    g.on('mouseenter', function(d) {
        d3.select(this).style("opacity", "0.85");
        if (currentLevelData ) {
          d3.select(this).select('text')
            .text(function(d){
                return d.data.value + "%";
            })
        }
      })
    g.on('mouseleave', function(d) {
      d3.select(this).style("opacity", "1");
      if (currentLevelData ) {
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
          return currentLevelData 
            ? formatPortfolioName(d.data.key)
            : "Select Level"; 
        });
 }

  useEffect(() => {
    drawChart(riskLevel ? currentLevelData : defaultValues)
  }, [riskLevel])


  return (
    <>
      <svg ref={graphRef} ></svg>
    </>
  );
}

export default RiskLevelDescriptionGraph;
