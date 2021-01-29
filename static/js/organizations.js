// Function to create markers. We'll call this function later on

var data;

var adultPetColor = '#6D98BA';
var otherPetColor = '#EEC170';

var colorScale = {
  'Adult Dogs': '#EEC170',
};

function addMarkers() {
  data.forEach(function (d) {
    console.log(d);
    var marker = L.circleMarker([+d.Latitude, +d.Longitude])
      .bindPopup(`<strong>Organization: </strong> <a href='${d.url_y}' target='_blank'>${d.name_y}</a><br><strong>Number of adoptable pets: </strong>${d["# of adoptable pets"]}<br><strong>Median pet age: </strong>${d.age}`);  ;
    var adult_dog = d.age === 'Adult';
    var color = colorScale[d.deviceControllerName] || '#6D98BA';
    if (adult_dog) {
      marker.setStyle({
        radius: 8,
        fillColor: color,
        fillOpacity: 1,
        color: '#ddd',
        weight: 0.25
      });
    } else {
      marker.setStyle({
        radius: 8,
        fillColor: otherPetColor,
        fillOpacity: 0.5,
        color: '#123',
        weight: 1
      });
    }

    marker.addTo(myMap);
  })
}

// Creating map object
var myMap = L.map("hexbin-map", {
  center: [39.502754, -98.452221],
  zoom: 5
});
console.log(myMap)

// Create a marker cluster group
// var markers = L.markerClusterGroup();

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

// Reading from csv file and calling the Add Markers later on
d3.csv('/static/data/hexbin_data.csv')
  .then(function (csv) {
    data = csv;
    addMarkers();
  });


// Adding legend

var legend = L.control({ position: 'topright' });

legend.onAdd = function (myMap) {
  // create div for legend
  var div = L.DomUtil.create('div', 'info legend');

  // add title for legend
  div.innerHTML = '<h4>Legend</h4>';

  div.innerHTML += '<i style="background:' + adultPetColor + '"></i> Adult Pet<br>';
  div.innerHTML += '<i style="background:' + otherPetColor + '"></i> Other Pet<br>';
 
  return div;
}

// Adding legend to the map
legend.addTo(myMap);
