// Select the dropdowns for pet type and characteristics
var dropDownCharacteristics = d3.select('#characteristics');

console.log(dropDownCharacteristics);

// pet characteristics lists for dropdown menu
var dogCharacteristics = ["Height", "Weight", "Group"];
var catCharacteristics = ["Weight", "Coat Length", "Playfullness"];

// initialize variables
var petTypeSelected;

// functions to run when page loads
d3.select(window).on("load", fillDropDown('dogs'));

// function to fill dropdown list of Dog or Cat Characteristics
function fillDropDown(petType) {
    petTypeSelected = petType;
    console.log(petTypeSelected);
    dropDownCharacteristics.html("");
    if (petType === "dogs") {
        dogCharacteristics.forEach(item => {
            dropDownCharacteristics.append("option").text(item).attr("value", item);
        });
        plotSunburst('Height');
    } else {
        catCharacteristics.forEach(item => {
            dropDownCharacteristics.append("option").text(item).attr("value", item);
        });
        plotSunburst('Weight');
    }
}

// function that draws Sunburst graph
function plotSunburst(selection) {
    console.log(selection);

    if (petTypeSelected === "dogs") { //Dogs
        d3.csv("../static/data/dog_breeds.csv").then(function (dogData) {
            console.log(dogData);
            var ids = [];
            var labels = [];
            var parents = [];

            // display plot depending on selection
            switch (selection) {
                case "Group":
                    ids = ["Foundation Stock Service", "Herding Group", "Hound Group", "Miscellaneous Class", "Non-Sporting Group", "Sporting Group", "Terrier Group", "Toy Group", "Working Group"];
                    labels = ["Foundation Stock Service", "Herding Group", "Hound Group", "Miscellaneous Class", "Non-Sporting Group", "Sporting Group", "Terrier Group", "Toy Group", "Working Group"];
                    parents = ["", "", "", "", "", "", "", "", ""];
                    dogData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.group);
                    });
                    break;
                case "Weight":
                    ids = ["featherweight", "lightweight", "middleweight", "heavyweight", "super heavyweight"];
                    labels = ["featherweight", "lightweight", "middleweight", "heavyweight", "super heavyweight"];
                    parents = ["", "", "", "", ""];
                    dogData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.weight_group);
                    });
                    break;
                default:
                    ids = ["xsmall", "small", "medium", "large", "xlarge"];
                    labels = ["xsmall", "small", "medium", "large", "xlarge"];
                    parents = ["", "", "", "", ""];
                    dogData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.height_group);
                    });
                    break;
            }

            //data
            var data = [{
                type: "sunburst",
                maxdepth: 2,
                ids: ids,
                labels: labels,
                parents: parents,
                textposition: 'inside',
                insidetextorientation: 'radial'
            }]

            // Set chart to be responsive 
            var config = {
                responsive: true
            }

            var layout = { margin: { l: 0, r: 0, b: 0, t: 0 } }

            // Render the plot to the div tag with id "sunburst"
            Plotly.newPlot('sunburst', data, layout, config)
                .then(gd => {
                    gd.on('plotly_sunburstclick', function (selBreedData) {
                        console.log(selBreedData.nextLevel);
                        if (!(selBreedData.nextLevel)) {
                            breedName = selBreedData.points[0].label;
                            console.log(breedName);
                            console.log(dogData);
                            displayDogBreedInfo(dogData, breedName)
                        }
                    })
                })
        });
    } else { //Cats
        d3.csv("../static/data/cat_breeds.csv").then(function (catData) {
            console.log(catData);
            var ids = [];
            var labels = [];
            var parents = [];

            // display plot depending on selection
            switch (selection) {
                case "Coat Length":
                    ids = ["Shorthair", "Longhair", "Longhair and Shorthair"];
                    labels = ["Shorthair", "Longhair", "Longhair and Shorthair"];
                    parents = ["", "", ""];
                    catData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.coat_length);
                    });
                    break;
                case "Playfullness":
                    ids = [1, 2, 3, 4, 5];
                    labels = ["Leave me alone!", "Low", "Moderate", "High", "Extreme"];
                    parents = ["", "", "", "", ""];
                    catData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.playfullness);
                    });
                    break;
                default:
                    ids = ["small", "medium", "large"];
                    labels = ["small", "medium", "large"];
                    parents = ["", "", ""];
                    catData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.weight_group);
                    });
                    break;
            }

            //data
            var data = [{
                type: "sunburst",
                maxdepth: 2,
                ids: ids,
                labels: labels,
                parents: parents,
                textposition: 'inside',
                insidetextorientation: 'radial'
            }]

            // Set chart to be responsive 
            var config = {
                responsive: true
            }

            var layout = { margin: { l: 0, r: 0, b: 0, t: 0 } }

            // Render the plot to the div tag with id "sunburst"
            Plotly.newPlot('sunburst', data, layout, config)
                .then(gd => {
                    gd.on('plotly_sunburstclick', function (selBreedData) {
                        console.log(selBreedData.nextLevel);
                        if (!(selBreedData.nextLevel)) {
                            breedName = selBreedData.points[0].label;
                            console.log(breedName);
                            console.log(catData);
                            displayCatBreedInfo(catData, breedName)
                        }
                    })
                })
        });
    }
}

// display Breed Info when sunburst is clicked
function displayDogBreedInfo(breedData, selBreed) {
    console.log(breedData);

    // find the tbody element
    var tbody = d3.select("tbody");
    console.log(tbody);

    // first clear the table of existing data
    tbody.html("");

    var filteredData = breedData.filter(data => data.breed_name === selBreed);
    var selBreedData = filteredData[0];

    console.log(selBreedData);

    // display the data requested
    tbody.append("tr").append("td").text(selBreedData.breed_name);
    tbody.append("tr").append("td").text(selBreedData.image);
    tbody.append("tr").append("td").text(selBreedData.description);
    tbody.append("tr").append("td").text(selBreedData.akc_rank);
    tbody.append("tr").append("td").text(selBreedData.life_expectancy);
    tbody.append("tr").append("td").text(selBreedData.group);
    tbody.append("tr").append("td").text(selBreedData.brusging_scale);


}

function displayCatBreedInfo(breedData, selBreed) {
}