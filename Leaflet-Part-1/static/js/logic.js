// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson").then((importedData) => {
    console.log(importedData);
    let data = importedData;
    });
    
    // Use Utah lat / long as center point. Source: https://www.mapsofworld.com/usa/states/utah/lat-long.html
    let myMap = L.map("map", {
      center: [32.8, -117.9],
      zoom: 5
    });
    
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
    }
    


      

      