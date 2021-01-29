// Pull the data from our API
d3.json("/dogs-by-state").then(function (dogData, err) {
    //d3.csv("../static/data/dog_breeds.csv").then(function (dogData) {
    if (err) { throw err };
    if (!dogData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }
    // console.log(dogData[0].contact_address_state)

    states_array = []

    for (var i = 0; i < dogData.length; i++) {
        states_array.push(dogData[i].contact_address_state);
    }

    var counts_dict = {};
    for (var i = 0; i < states_array.length; i++) {
        counts_dict[states_array[i]] = 1 + (counts_dict[states_array[i]] || 0);
    }

    // console.log(states_array);
    // console.log(counts_dict);
    // console.log(Object.keys(counts_dict))

    var values = Object.keys(counts_dict).map(function(key){
        return counts_dict[key];
    });

});

d3.json("/cats-by-state").then(function (catData, err) {
    //d3.csv("../static/data/dog_breeds.csv").then(function (dogData) {
    if (err) { throw err };
    if (!catData) {
        console.log("I wasn't able to get data from the Web API you selected.");
        return;
    }
    // console.log(catData[0].contact_address_state)


    states_array = []

    for (var i = 0; i < catData.length; i++) {
        states_array.push(catData[i].contact_address_state);
    }

    var cat_counts_dict = {};
    for (var i = 0; i < states_array.length; i++) {
        cat_counts_dict[states_array[i]] = 1 + (cat_counts_dict[states_array[i]] || 0);
    }

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