// Creating map object
var myMap = L.map("map", {
  center: [39.502754, -98.452221],
  zoom: 5
});
console.log(myMap)

var markers;

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

optionChanged("Dog");

//Calling MongoDB Collection
function optionChanged(dbSelected) {
  var webApiPath = "/find-a-pet/" + dbSelected;
  console.log(dbSelected);

  // switch (dbSelected) {
  //   case "mongodb":
  //     webApiPath = "/mongodb-web-api";
  //     break;
  //   case "Dogs":
  //     webApiPath = "/find-a-pet/dogs";
  //     break;
  //   case "Cats":
  //       webApiPath = "/find-a-pet/cats";
  //       break;
  //   default:
  //     console.log("An improper dropdown option has been selected.");
  //     return;
  // }


  d3.json(webApiPath).then(function (webAPIData, err) {
    if (err) { throw err };
    if (!webAPIData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }

    //console.log(webAPIData);

    //Creating Markers
    for (var i = 0; i < webAPIData.length; i++) {
      var id = webAPIData[i];
      markers = L.marker([id.Latitude, id.Longitude])
        .bindPopup(`<strong>Name: </strong>${id.name}<hr><strong>Breed: </strong>${id.breed}<br><strong>Link: </strong><a href='${id.url}' target='_blank'>Find me!</a>`)
        .addTo(myMap);
    }

  });
}
