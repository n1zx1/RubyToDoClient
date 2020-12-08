import React, { Component } from 'react'
import ChartistGraph from 'react-chartist';


export default function GraphicBuilder() {

  var data = {
    labels: ['Done', 'Not Done'],
    series: [10, 17]
  };
  
  var sum = function(a, b) { return a + b };

  var type = 'Pie'

  return (
    <div>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"></link>
      <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
      <ChartistGraph data={data} sum={sum} type={type} />
    </div>
  )
}