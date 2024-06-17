// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {
   
    // Initialize the map. Use Utah lat / long as center point. Source: https://www.mapsofworld.com/usa/states/utah/lat-long.html
  let myMap = L.map("map", {
    center: [32.8, -117.9],
    zoom: 4
    });
    // // Determine the size of the marker Source: Module15-class-1- Activity-9
    // function markerSize(bigness) {
    //   return bigness *20;
    // };

  // Adding the tile layer. source: class 2/ activity 2 / just-markers.js
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
      

  //Add a disctionary to determine each color for marker by depth
  let depthRanges = [0, 10, 30, 50, 70, 90];
  let colors = ["#00FF00", "green", "yellow", "orange", "red", '#800080'];

// Define legend colors and labels based on earthquake magnitudes Source: Xpert Learning Assistant
  const legendColors = ['#FF0000', 'green', 'yellow', 'orange', 'red', '#800080'];
  const legendLabels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+']; 

//Create the legend on the website
  let html = '<div id="legend">';
    html += '<h3>Depth (km)</h3>';
    for (let i = 0; i < depthRanges.length; i++) {
        html += `<div><span class="legend-color" style="background-color: ${colors[i]}"></span>${depthRanges[i]} - ${depthRanges[i + 1] || '+'}</div>`;
    }
    html += '</div>';


  // Create a legend control in the map
  let legend = L.control({ position: 'bottomright'});

// Define the legend content and styling Source: Xpert Learning Assistant
  legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML = html;
    return div;
  };

// Add the legend control to the map
  legend.addTo(myMap);

// Source: Xpert Assistant
// Loop through the earthquake data features
  let features = data.features;
  for (let i = 0; i < features.length; i++) {
      let feature = features[i];
      let coords = feature.geometry.coordinates;
      let properties = feature.properties;
      let depth = coords[2];
      let magnitude = properties.mag;
  

  // Determine marker color based on depth Source: Xpert Learning Assistant
  let fillColor = depth > 90 ? colors[5] :
    depth > 70 ? colors[4] :
    depth > 50 ? colors[3] :
    depth > 30 ? colors[2] :
    depth > 10 ? colors[1] :
                colors[0];

  // Create a marker for each earthquake
  let marker = L.circleMarker([coords[1], coords[0]], {
    radius: magnitude * 6,
    color: "#000",
    fillColor: fillColor,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }).addTo(myMap);


  // Add color indicators and labels to the legend
  // Customize the marker appearance and popup content
  marker.bindPopup(`<h3>${properties.place}</h3><hr><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p><p>${new Date(properties.time)}</p>`);
  }
});