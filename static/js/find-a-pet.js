// Creating map object
var myMap = L.map("map", {
  center: [39.502754, -98.452221],
  zoom: 5
});
console.log(myMap)

// Create a marker cluster group
var markers = L.markerClusterGroup();

// Initialize variables
var petTypeSelected = "Dog";

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
console.log("find a pet")

// function to run when page loads
d3.select(window).on("load", optionChanged('Dog'));

//Calling MongoDB Collection
function optionChanged(petSelected) {
  petTypeSelected = petSelected;

  // Call function to fill breeds drop down list
  fillBreedsDropdown(petSelected);

  // route to find pets for selected pet type
  var webApiPath = "/find-a-pet/" + petSelected;
  console.log(petSelected);

  // switch (petSelected) {
  //   case "mongodb":
  //     webApiPath = "/mongodb-web-api";
  //     break;
  //   default:
  //     console.log("An improper dropdown option has been selected.");
  //     return;
  // }

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
    dropDownBreeds.append("option").text("Select a Breed").attr("value", "Nan");
    breedData.forEach(item => {
      dropDownBreeds.append("option").text(item).attr("value", item);
    });
  });
  
}

// Function to find pets by pet type and breed
function findPetsByBreed(petBreed) {  
  // route to find pets by breed
  var webApiPath = "/find-a-pet/" + petTypeSelected + "/" + petBreed;
  // console.log(petBreed);
  // Call function to draw markers
  drawMarkers(webApiPath);
}