// Function to create markers. We'll call this function later on

var data;

// colors for circles
var adultPetColor = '#6D98BA';
var otherPetColor = '#EEC170';

var colorScale = {
  'Adult Dogs': '#EEC170',
};

// limits and circle radius lists
var limits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 200];
var radius = [6, 8, 10, 12, 14, 16, 17, 18, 19, 20];

// function to find the radius given the number of pets
function getRadius(d) {
  for (var i = 0; i < limits.length; i++) {
    if (d < limits[i]) {
      return radius[i];
    }
    else if (d > limits[limits.length - 1]) {
      return 10 + radius[limits.length-1];
    }
  }
}

function addMarkers() {
  data.forEach(function (d) {
    var marker = L.circleMarker([+d.Latitude, +d.Longitude])
      .bindPopup(`<strong>Organization: </strong> <a href='${d.url_y}' target='_blank'>${d.name_y}</a><hr style='margin:5px'><strong>Number of adoptable pets: </strong>${d["# of adoptable pets"]}<br><strong>Median pet age: </strong>${d.age}`);  ;
    var adult_dog = d.age === 'Adult';
    var color = colorScale[d.deviceControllerName] || '#6D98BA';
    if (adult_dog) {
      marker.setStyle({
        radius: getRadius(d["# of adoptable pets"]),
        fillColor: color,
        fillOpacity: 1,
        color: '#ddd',
        weight: 0.25
      });
    } else {
      marker.setStyle({
        radius: getRadius(d["# of adoptable pets"]),
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

// Adding a tile layer (the background map image) to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAPBOX_API_KEY
}).addTo(myMap);

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
  div.innerHTML = '<h5>Median Pet Age<br>per Organization</h5>';

  div.innerHTML += '<i style="background:' + adultPetColor + '"></i> Adult Pet<br>';
  div.innerHTML += '<i style="background:' + otherPetColor + '"></i> Other Pet<br>';
 
  return div;
}

// Adding legend to the map
legend.addTo(myMap);
