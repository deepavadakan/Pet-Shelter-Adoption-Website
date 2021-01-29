// Creating map object
var myMap = L.map("hexbin-map", {
    center: [39.502754, -98.452221],
    zoom: 5
  });
  console.log(myMap)
  
  // Create a marker cluster group
  var markers = L.markerClusterGroup();
  
  // Adding a tile layer (the background map image) to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: MAPBOX_API_KEY
  }).addTo(myMap);
  console.log(myMap)