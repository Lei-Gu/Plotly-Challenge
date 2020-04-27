// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((Data) => {
    console.log(Data);
    var data_all = Data.samples;
    metadata_all = Data.metadata;
    
    wfreq = Data.metadata.map(d => d.wfreq);
    console.log(`Washing Freq: ${wfreq}`);

    console.log(data_all);
    console.log(metadata_all);

    allGroup = data_all.map(d => d.id)
    console.log(allGroup);

    d3.select("#selDataset")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) 
      // corresponding value returned by the button





    function update(selectedOption) {
    
      console.log(selectedOption);

      let data = data_all.filter(d => d.id === selectedOption);
      console.log(data);

      info = metadata_all.filter(d => d.id.toString() === selectedOption)[0];
      console.log(info);

      // select demographic panel to put data
      var demographicInfo = d3.select("#sample-metadata");
      
      // empty the demographic info panel each time before getting new id info
      demographicInfo.html("");

      // grab the necessary demographic data data for the id and append the info to the panel
      Object.entries(info).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });


      // asign X and Y values
      x_value = data.map(row => row.sample_values);
      x_value = x_value[0].slice(0, 10)
      
      y_value = data.map(row => row.otu_ids);
      y_value = y_value[0].slice(0, 10)
      y_bar = y_value.map(d => "OTU " + d);
    
      y_value = y_value.reverse();
      y_bar = y_bar.reverse();
      x_value = x_value.reverse();

      otu_labels = data.map(row => row.otu_labels);
      otu_labels = otu_labels[0].slice(0, 10)
      otu_labels = otu_labels.reverse();

      console.log(x_value);
      console.log(y_value);
      console.log(otu_labels);
      // Trace1 for the samples Data
      var trace1 = {
        x: x_value,
        y: y_bar,
        text: otu_labels,
        type: "bar",
        orientation: "h"
      };
    
      // data
      var chartData = [trace1];
    
      // Apply the group bar mode to the layout
      var layout = {
          title: "Top 10 OTUs found in that individual",
          xaxis: { title: "Values" },
          yaxis: { title: "OTU ID"}
        };
    
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", chartData, layout);

      // Bubble Chart
      var trace2 = {
        x: y_value,
        y: x_value,
        text: otu_labels,
        type: "scatter",
        mode: 'markers',
        marker: {
          size: x_value,
          color:y_value,
        }
      };
      
      var chartData2 = [trace2];
      
      var layout2 = {
        title: 'Bubble Chart',
        showlegend: true,
        // height: 600,
        // width: 600
      };
      
      Plotly.newPlot('bubble', chartData2, layout2);

    }
      // Gauge Chart
      var trace3 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: "Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 18 }  },
          type: "indicator",
          delta: {reference: 9, increasing: {color: "green"}},
          mode: "gauge+number",
        
          gauge: {
            axis: {range: [null, 9], tickwidth: 1, tickcolor: "black" },
            bar: { color: "black" },  // Color of the bar (black) that indicates the washing frequency value
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
              { range: [0, 1], color: "lightcoral" },
              { range: [1, 2], color: "lightpink" },
              { range: [2, 3], color: "yellowgreen" },
              { range: [3, 4], color: "lightgreen" },
              { range: [4, 5], color: "green" },
              { range: [5, 6], color: "lightblue" },
              { range: [6, 7], color: "cyan" },
              { range: [7, 8], color: "royalblue" },
              { range: [8, 9], color: "blue" }
            ]}
        }
        
      ];
      
      var layout3 = { 
        width: 600, 
        height: 500, 
        margin: { t: 0, b: 0 } 
      };
      
      Plotly.newPlot('gauge', trace3, layout3);


    // // Build a Pie Chart
    // // Use slice() to grab the top 10 sample_values,
    // // otu_ids, and labels (10 each).
    //   let trace4 = [{
        
    //     values: sample_values_pie.slice(0, 10),
    //     labels: otu_ids_pie.slice(0, 10),
    //     hovertext: otu_label_pie.slice(0, 10),
    //     hoverinfo: "hovertext",
    //     type: "pie",

    //   }];
      
    //   let layout4 = {
    //     showlegend: true,
    //     height: 400,
    //     width: 500
    //   };
      
    //   Plotly.newPlot("pie", trace4, layout4);


    // When the button is changed, run the update function
    d3.select("#selDataset").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the update function with this selected option
        update(selectedOption)
    })


  })