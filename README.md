# Belly Button Biodiversity Dashboard:

This is a full stack app with html, js, css, python and sqlite files.

* Use Plotly.js to build interactive charts for your dashboard.

    
  * Create a Bubble Chart that uses data from your samples route (/samples/<sample>) to display each sample.

    * Use otu_ids for the x values.

    * Use sample_values for the y values.

    * Use sample_values for the marker size.

    * Use otu_ids for the marker colors.

    * Use otu_labels for the text values.
    
  * Display the sample metadata from the route /metadata/<sample>

    * Display each key/value pair from the metadata JSON object somewhere on the page.

  * Update all of the plots any time that a new sample is selected.
  
  * Deploy Flask app to Heroku: [Belly Button Biodiversity Dashboard](https://belly-button-biodiversity-zg.herokuapp.com/)
  
  * Use Flask API starter code to serve the data needed for plots.
  
