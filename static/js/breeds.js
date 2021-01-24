// Select the dropdowns for pet type and characteristics
var dropDownCharacteristics = d3.select('#characteristics');

// pet characteristics lists for dropdown men
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
    // first clear the table of existing data
    tbody.html("");

    var filteredData = breedData.filter(data => data.breed_name === selBreed);
    var selBreedData = filteredData[0];

    console.log(selBreedData);

    // display the data requested
    // breed name
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .classed("breed_name", true)
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
        .text("Rank: ");
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
    // // scale legend
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Scale: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.brushing_scale.replace("%", ""))
    //     .attr("disabled", true);
    // //brushing scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Brushing: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.brushing_scale.replace("%", ""))
    //     .attr("disabled", true);
    // //shedding scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Shedding: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.shedding_scale.replace("%", ""))
    //     .attr("disabled", true);
    // //energy scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Energy: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.energy_scale.replace("%", ""))
    //     .attr("disabled", true);
    // //trainability scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Trainability: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.trainability_scale.replace("%", ""))
    //     .attr("disabled", true);
    // //temperment scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Temperment: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 100)
    //     .attr("value", selBreedData.temperment_scale.replace("%", ""))
    //     .attr("disabled", true);

    var svgHeight = 600;
    var svgWidth = "100%";

    var chartMargin = {
        top: 30,
        left: 5
    };

    var svg = d3.select("#scales")
        .html("")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    var breedScales = [{ "Type": "Brushing", "Scale": parseInt(selBreedData.brushing_scale.replace("%", "")) },
    { "Type": "Shedding", "Scale": parseInt(selBreedData.shedding_scale.replace("%", "")) },
    { "Type": "Energy", "Scale": parseInt(selBreedData.energy_scale.replace("%", "")) },
    { "Type": "Trainability", "Scale": parseInt(selBreedData.trainability_scale.replace("%", "")) },
    { "Type": "Temperment", "Scale": parseInt(selBreedData.temperment_scale.replace("%", "")) }];

    var barGroup = chartGroup.selectAll("rect")
        .data(breedScales)
        .enter()
        .append("g");

    barGroup.append("rect")
        .classed("bar", true)
        .attr("width", function (d) {
            return d.Scale * 5;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * 60;
        });

    barGroup.append("text")
        .attr("dx", 0)
        .attr("dy", function (d, i) {
            return (i * 60) - 10;
        })
        .text(function (d) {
            if (isNaN(d.Scale)) {
                return d.Type + ": unknown";
            }
            else {
                return d.Type + ": " + d.Scale + "%";
            }

        });

}

// function to display cat breed information
function displayCatBreedInfo(breedData, selBreed) {

    // find the tbody element
    var tbody = d3.select("tbody");

    // first clear the table of existing data
    tbody.html("");

    var filteredData = breedData.filter(data => data.breed_name === selBreed);
    var selBreedData = filteredData[0];

    console.log(selBreedData);

    // display the data requested
    // breed name
    tbody.append("tr").append("td")
        .attr("colspan", 2)
        .classed("breed_name", true)
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
    // //playfullness scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Playfullness: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.playfullness)
    //     .attr("disabled", true);
    // //activity scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Activity: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.activity)
    //     .attr("disabled", true);
    // //friendliness to other pets scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Friendliness to other pets: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.friendliness_others)
    //     .attr("disabled", true);
    // //friendliness to children scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Friendliness to children: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.friendliness_children)
    //     .attr("disabled", true);
    // //grooming scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Grooming: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.grooming)
    //     .attr("disabled", true);
    // //vocality scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Vocality: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.vocality)
    //     .attr("disabled", true);
    // //attention scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Attention: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.attention)
    //     .attr("disabled", true);
    // //affection scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Affection: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.affection)
    //     .attr("disabled", true);
    // //docility scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Docility: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.docility)
    //     .attr("disabled", true);
    // //intelligence scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Intelligence: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.intelligence)
    //     .attr("disabled", true);
    // //independence scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Independence: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.independence)
    //     .attr("disabled", true);
    // //hardiness scale
    // var tr = tbody.append("tr");
    // tr.append("td")
    //     .classed("tdHeader", true)
    //     .text("Hardiness: ");
    // tr.append("td")
    //     .append("input")
    //     .classed("slider", true)
    //     .attr("type", "range")
    //     .attr("min", 1)
    //     .attr("max", 5)
    //     .attr("value", selBreedData.hardiness)
    //     .attr("disabled", true);

    var svgHeight = 600;
    var svgWidth = 500;

    var chartMargin = {
        top: 30,
        left: 5
    };

    var svg = d3.select("#scales")
        .html("")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    var breedScales = [{ "Type": "Playfullness", "Scale": parseInt(selBreedData.playfullness) },
    { "Type": "Activity", "Scale": parseInt(selBreedData.activity) },
    { "Type": "Friendliness to other pets scale", "Scale": parseInt(selBreedData.friendliness_others) },
    { "Type": "Friendliness to children scale", "Scale": parseInt(selBreedData.friendliness_children) },
    { "Type": "Grooming", "Scale": parseInt(selBreedData.grooming) },
    { "Type": "Vocality", "Scale": parseInt(selBreedData.vocality) },
    { "Type": "Attention", "Scale": parseInt(selBreedData.attention) },
    { "Type": "Affection", "Scale": parseInt(selBreedData.affection) },
    { "Type": "Docility", "Scale": parseInt(selBreedData.docility) },
    { "Type": "Intelligence", "Scale": parseInt(selBreedData.intelligence) },
    { "Type": "Independence", "Scale": parseInt(selBreedData.independence) },
    { "Type": "Hardiness", "Scale": parseInt(selBreedData.hardiness) }];

    var barGroup = chartGroup.selectAll("rect")
        .data(breedScales)
        .enter()
        .append("g");

    barGroup.append("rect")
        .classed("bar", true)
        .attr("width", function (d) {
            return d.Scale * 100;
        })
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * 60;
        });

    barGroup.append("text")
        .attr("dx", 0)
        .attr("dy", function (d, i) {
            return (i * 60) - 10;
        })
        .text(function (d) {
            if (isNaN(d.Scale)) {
                return d.Type + ": unknown";
            }
            else {
                return d.Type + ": " + d.Scale;
            }

        });
}