// Select the dropdowns for pet type and characteristics
var dropDownCharacteristics = d3.select('#characteristics');

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
            // initialize variables
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
                default: //Height
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
                        console.log(selBreedData);
                        if (!(selBreedData.nextLevel)) {
                            breedName = selBreedData.points[0].label;
                            displayDogBreedInfo(dogData, breedName)
                        }
                    })
                })
        });
    } else { //Cats
        d3.csv("../static/data/cat_breeds.csv").then(function (catData) {
            console.log(catData);
            // intialize variables
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
                    labels = ["Leave me alone!", "I’d Rather not…", " Only when<br>I feel like it", "I’m always<br>up to play!", "Life is nothing<br>but games"];
                    parents = ["", "", "", "", ""];
                    catData.forEach(data => {
                        ids.push(data.breed_name);
                        labels.push(data.breed_name);
                        parents.push(data.playfullness);
                    });
                    displayLegend();
                    break;
                default: // Weight
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

            var layout = { 
                margin: { l: 0, r: 0, b: 0, t: 0 },
                showlegend: true
            }

            // Render the plot to the div tag with id "sunburst"
            Plotly.newPlot('sunburst', data, layout, config)
                .then(gd => {
                    gd.on('plotly_sunburstclick', function (selBreedData) {
                        console.log(selBreedData.nextLevel);
                        if (!(selBreedData.nextLevel)) {
                            breedName = selBreedData.points[0].label;
                            displayCatBreedInfo(catData, breedName)
                        }
                    })
                })
        });
    }
}

// display selected Breed Info
function displayDogBreedInfo(breedData, selBreed) {
    console.log(breedData);

    // find the tbody element
    var tbody = d3.select("tbody");
    // first clear the table of existing data
    tbody.html("");

    // retrieve the breed info
    var filteredData = breedData.filter(data => data.breed_name === selBreed);
    var selBreedData = filteredData[0];

    console.log(selBreedData);

    // display the data requested
    // breed name
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .classed("breedName", true)
        .text(selBreedData.breed_name)
        .append("hr");
    // image
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .append("img").attr("src", selBreedData.image)
        .attr('width', "50%");
    // description
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .text(selBreedData.description);
    // temperment
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Temperment: ");
    tr.append("td").text(selBreedData.temperment);
    // rank
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("rank: ");
    tr.append("td").text(selBreedData.akc_rank.replace("Ranks ", ""));
    // life expectancy
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Life Expectancy: ");
    tr.append("td").text(selBreedData.life_expectancy);
    // group
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Group: ");
    tr.append("td").text(selBreedData.group);
    // height
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Height: ");
    tr.append("td").text(selBreedData.height);
    // weight
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Weight: ");
    tr.append("td").text(selBreedData.weight);
    // color options
    var tr = tbody.append("tr");
    var colOptions = selBreedData.color_options.replace("[", "");
    colOptions = colOptions.replace("]", "");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Color options: ");
    tr.append("td").text(colOptions);

    // draw scales
    var svgHeight = 600;
    var svgWidth = "100%";

    var scalesMargin = {
        top: 30,
        left: 5
    };

    var svg = d3.select("#breedScales")
        .html("")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var scalesGroup = svg.append("g")
        .attr("transform", `translate(${scalesMargin.left}, ${scalesMargin.top})`);

    // array of dicts for scales
    var breedScales = [{ "type": "Brushing", "scale": parseInt(selBreedData.brushing_scale.replace("%", "")) },
    { "type": "Shedding", "scale": parseInt(selBreedData.shedding_scale.replace("%", "")) },
    { "type": "Energy", "scale": parseInt(selBreedData.energy_scale.replace("%", "")) },
    { "type": "Trainability", "scale": parseInt(selBreedData.trainability_scale.replace("%", "")) },
    { "type": "Temperment", "scale": parseInt(selBreedData.temperment_scale.replace("%", "")) }];

    // draw bars
    var barGroup = scalesGroup.selectAll("rect")
        .data(breedScales)
        .enter()
        .append("g");

    barGroup.append("rect")
        .classed("scalesBar", true)
        .attr("width", function (d) {
            return d.scale * 5;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * 60;
        });

    // add text for the scales
    barGroup.append("text")
        .attr("dx", 0)
        .attr("dy", function (d, i) {
            return (i * 60) - 10;
        })
        .text(function (d) {
            if (isNaN(d.scale)) {
                return d.type + ": unknown";
            }
            else {
                return d.type + ": " + d.scale + "%";
            }
        });
}

// function to display cat breed information
function displayCatBreedInfo(breedData, selBreed) {

    // find the tbody element
    var tbody = d3.select("tbody");

    // first clear the table of existing data
    tbody.html("");

    // retrieve the breed info
    var filteredData = breedData.filter(data => data.breed_name === selBreed);
    var selBreedData = filteredData[0];

    console.log(selBreedData);

    // display the data requested
    // breed name
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .classed("breedName", true)
        .text(selBreedData.breed_name)
        .append("hr");
    // image
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .append("img").attr("src", selBreedData.image)
        .attr('width', "50%");
    // description
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .text(selBreedData.description);
    // personality
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Personality: ");
    tr.append("td").text(selBreedData.personality);
    // coat length
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Coat Length: ");
    tr.append("td").text(selBreedData.coat_length);
    // life expectancy
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Life Expectancy: ");
    tr.append("td").text(selBreedData.life_expectancy);
    // weight
    var tr = tbody.append("tr");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Weight: ");
    tr.append("td").text(selBreedData.weight);
    // color options
    var tr = tbody.append("tr");
    var colOptions = selBreedData.color_options.replace("[", "");
    colOptions = colOptions.replace("]", "");
    tr.append("td")
        .classed("tdHeader", true)
        .text("Color options: ");
    tr.append("td").text(colOptions);

    // draw scales
    var svgHeight = 600;
    var svgWidth = 500;

    var scalesMargin = {
        top: 30,
        left: 5
    };

    var svg = d3.select("#breedScales")
        .html("")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var scalesGroup = svg.append("g")
        .attr("transform", `translate(${scalesMargin.left}, ${scalesMargin.top})`);

    // array of dicts for scales
    var breedScales = [{ "type": "Playfullness", "scale": parseInt(selBreedData.playfullness) },
    { "type": "Activity", "scale": parseInt(selBreedData.activity) },
    { "type": "Friendliness to other pets scale", "scale": parseInt(selBreedData.friendliness_others) },
    { "type": "Friendliness to children scale", "scale": parseInt(selBreedData.friendliness_children) },
    { "type": "Grooming", "scale": parseInt(selBreedData.grooming) },
    { "type": "Vocality", "scale": parseInt(selBreedData.vocality) },
    { "type": "Attention", "scale": parseInt(selBreedData.attention) },
    { "type": "Affection", "scale": parseInt(selBreedData.affection) },
    { "type": "Docility", "scale": parseInt(selBreedData.docility) },
    { "type": "Intelligence", "scale": parseInt(selBreedData.intelligence) },
    { "type": "Independence", "scale": parseInt(selBreedData.independence) },
    { "type": "Hardiness", "scale": parseInt(selBreedData.hardiness) }];

    // draw bars
    var barGroup = scalesGroup.selectAll("rect")
        .data(breedScales)
        .enter()
        .append("g");

    barGroup.append("rect")
        .classed("scalesBar", true)
        .attr("width", function (d) {
            return d.scale * 100;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * 60;
        });

    // add text for the scales
    barGroup.append("text")
        .attr("dx", 0)
        .attr("dy", function (d, i) {
            return (i * 60) - 10;
        })
        .text(function (d) {
            if (isNaN(d.scale)) {
                return d.type + ": unknown";
            }
            else {
                return d.type + ": " + d.scale;
            }
        });
}

// display legend for sunburst
function displayLegend() {

    var legendPlayfullness = [{ "rank": 5, "scale": "Life is nothing but games"},
    { "rank": 4, "scale": "I’m always up to play!"},
    { "rank": 3, "scale": "Only when I feel like it"},
    { "rank": 2, "scale": "I’d Rather not…" },
    { "rank": 1, "scale": "Leave me alone!" }];
    
    // find the tbody element
    var tbody = d3.select("#breedLegend");
    // first clear the table of existing data
    tbody.html("");
    tbody.append("tr")
        .append("td")
        .attr("colSpan", 2)
        .classed("tdHeader", true)
        .text("Scale");

    for (i=0; i < legendPlayfullness.length; i++) {
        var tr = tbody.append("tr");
        tr.append("td")
            .classed("tdHeader", true)
            .text(legendPlayfullness[i].rank + ": ");
        tr.append("td").text(legendPlayfullness[i].scale);
    }
}