// Pull the data from our API
d3.json("/dogs-by-state").then(function (dogData, err) {
    //d3.csv("../static/data/dog_breeds.csv").then(function (dogData) {
    if (err) { throw err };
    if (!dogData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }
    console.log(dogData[0].contact_address_state)


    states_array = []

    for (var i = 0; i < dogData.length; i++) {
        states_array.push(dogData[i].contact_address_state);
    }

    var counts_dict = {};
    for (var i = 0; i < states_array.length; i++) {
        counts_dict[states_array[i]] = 1 + (counts_dict[states_array[i]] || 0);
    }

    console.log(states_array);
    console.log(counts_dict);
    console.log(Object.keys(counts_dict))

    var values = Object.keys(counts_dict).map(function(key){
        return counts_dict[key];
    });

});




var data = [
    {
      x: Object.keys(counts_dict),
      y: values,
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('dog_states_bar', data);




// var canada = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

// // Display the default plot
// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

// init();