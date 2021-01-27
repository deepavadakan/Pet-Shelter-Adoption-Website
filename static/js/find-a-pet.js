

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

  //Calling MongoDB Collection
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



//Creating Markers
for (var i = 0; i < link.length; i++) {
    var id = link[i];
    L.marker(id.name)
      .bindPopup(id.address + id.id)
      .addTo(myMap);
  }

  };
    