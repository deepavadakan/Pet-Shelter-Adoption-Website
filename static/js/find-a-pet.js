// Creating map object

var myMap = L.map("map", {
    center: [40.502754, -74.452221],
    zoom: 13
  });
  console.log(myMap)
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  console.log(myMap)
  console.log("find a pet")

  function optionChanged(dbSelected) {
    var webApiPath = "";
    console.log(dbSelected);
  
    switch (dbSelected) {
      case "mongodb":
        webApiPath = "/mongodb-web-api";
        break;
      default:
        console.log("An improper dropdown option has been selected.");
        return;
    }

// Use this link to get the geojson data.
// var link = "static/data/animals.json";

// Convert address to lat lon to plot points
// map.on('geosearch_showlocation', function (result) {
//     L.marker([result.x, result.y]).addTo(myMap)
// });

// $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+address, function(data){
//        console.log(data);
//     });

//Creating Markers
for (var i = 0; i < link.length; i++) {
    var id = link[i];
    L.marker(id.name)
      .bindPopup("<h1>" + id.address + "</h1> <hr> <h3> " + id.id + "</h3>")
      .addTo(myMap);
  }

  };
    