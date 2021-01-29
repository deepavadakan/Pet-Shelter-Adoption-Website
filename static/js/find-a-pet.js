// Creating map object
var myMap = L.map("map", {
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

// function to run when page loads
d3.select(window).on("load", findPets('Dog'));

// Find pets for given selection
function findPets(petSelected) {
  // Call function to fill breeds drop down list
  fillBreedsDropdown(petSelected);

  // Call function to fill breeds drop down list
  fillAgeDropdown(petSelected);

  // route to find pets for selected pet type
  var webApiPath = "/find-a-pet/" + petSelected + "/null/null";
  console.log(petSelected);

  // Call function to draw markers 
  drawMarkers(webApiPath);
  
}

// Function to draw markers
function drawMarkers (url) {
  d3.json(url).then(function (webAPIData, err) {
    if (err) { throw err };
    if (!webAPIData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }
    //console.log(webAPIData);

    // First clear existing markers
    markers.clearLayers();

    // Creating Markers
    for (var i = 0; i < webAPIData.length; i++) {
      var petInfo = webAPIData[i];
      markers.addLayer(L.marker([petInfo.Latitude, petInfo.Longitude])
          .bindPopup(`<img src="${petInfo.photo}" width=100%><br><strong>Name: </strong>${petInfo.name} <a href='${petInfo.url}' target='_blank'>Adopt me!</a><br><strong>Breed: </strong>${petInfo.breed}<br>${petInfo.description}`));  
    }
    // add markers to map
    myMap.addLayer(markers);
  });
}

// function to fill the breeds drop down list based on pet selected
function fillBreedsDropdown(petSelected) {
  var url = `/pet-breeds-list/${petSelected}`;
  d3.json(url).then(function (breedData, err) {
    if (err) { throw err };
    if (!breedData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }
    // console.log(breedData);

    // element for breeds drop down list
    var dropDownBreeds = d3.select('#pet-breed');
    // Clear drop down
    dropDownBreeds.html("");
    // First entry to be blank
    dropDownBreeds.append("option").text("Select a Breed").attr("value", "null");
    breedData.forEach(item => {
      dropDownBreeds.append("option").text(item).attr("value", item);
    });
  });
  
}

// function to fill the breeds drop down list based on pet selected
function fillAgeDropdown(petSelected) {

  var ageData = [{"text":"Baby", "value":"Baby"},
                {"text":"Young", "value":"Young"},
                {"text":"Adult", "value":"Adult"},
                {"text":"Senior", "value":"Senior"}]
  // element for breeds drop down list
  var dropDownAge = d3.select('#pet-age');
  // Clear drop down
  dropDownAge.html("");
  // First entry to be blank
  dropDownAge.append("option").text("Select Age").attr("value", "null");
  ageData.forEach(item => {
    dropDownAge.append("option").text(item.text).attr("value", item.value);
  });
}

// Function to find pets by selected option
function findPetsByOption(petOption) {  
  console.log(petOption);
  // find pet type selected
  var petTypeSelected =  d3.select('#pet-type').node().value;
  console.log(petTypeSelected);
  // find pet breed selected
  var petBreed =  d3.select('#pet-breed').node().value;
  console.log(petBreed);
  // find pet age selected
  var petAge =  d3.select('#pet-age').node().value;
  console.log(petAge);
  
  var webApiPath = "/find-a-pet/" + petTypeSelected + "/" + petBreed + "/" + petAge;
  
  // Call function to draw markers
  drawMarkers(webApiPath);
}