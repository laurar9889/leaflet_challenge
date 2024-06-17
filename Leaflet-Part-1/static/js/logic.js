// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then((importedData) => {
  console.log(importedData);
  let data = importedData;
  });
    // Initialize the map. Use Utah lat / long as center point. Source: https://www.mapsofworld.com/usa/states/utah/lat-long.html
  let myMap = L.map("map", {
    center: [32.8, -117.9],
    zoom: 7
  });
    // Determine the size of the marker Soruce: Module15-class-1- Activity-9
    function markerSize(bigness) {
      return bigness *20;
    };

  // Adding the tile layer. source: class 2/ activity 2 / just-markers.js
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
      

  //Add a function to determine each color for marker by depth
    function eachColor(depth){
      if (depth <10) return "#00FF00";
      else if (depth <30) return "green";
      else if (depth < 50) return "yellow";
      else if (depth < 70) return "orange";
      else if (depth <90) return "red";
      else return "#00FF00";
    };

// Define legend colors and labels based on earthquake magnitudes Source: Xpert Learning Assistant
const legendColors = ['#FF0000', 'green', 'yellow', 'orange', 'red', '#800080'];
const legendLabels = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+']; 

  // Create a legend control
const legend = L.control({ position: 'bottomright'});

// Define the legend content and styling Source: Xpert Learning Assistant
legend.onAdd = function(map) {
  const div = L.DomUtil.create('div', 'legend');
  let legendContent = '<h4>Earthquake Magnitude</h4>';
  
  // Add color indicators and labels to the legend
  for (let i = 0; i < legendColors.length; i++) {
      legendContent += `<i style="background:${legendColors[i]}"></i> ${legendLabels[i]}<br>`;
  }

  div.innerHTML = legendContent;
  return div;
};

// Add the legend control to the map
legend.addTo(myMap);


// Source: Xper Assistant
// Loop through the earthquake data features
data.features.forEach(feature => {
  const { geometry, properties } = feature;
  const { coordinates } = geometry;
  const [lng, lat] = coordinates;

  // Create a marker for each earthquake
    const marker = L.marker([lat, lng]).addTo(myMap);

  // Customize the marker appearance and popup content
    marker.bindPopup(`<b>Magnitude:</b> ${properties.mag}<br><b>Location:</b> ${properties.place}`);
        });
  
    createFeatures(data.features);
