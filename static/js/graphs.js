d3.json("/dogs-by-state").then(function (dogData, err) {
    d3.json("/cats-by-state").then(function (catData, err) {
        if (err) { throw err };

        dogs_states_array = []
        cat_states_array = []

        for (var i = 0; i < dogData.length; i++) {
            dogs_states_array.push(dogData[i].contact_address_state);
        }
        for (var i = 0; i < catData.length; i++) {
            cat_states_array.push(catData[i].contact_address_state);
        }


        var dog_counts_dict = {};
        for (var i = 0; i < dogs_states_array.length; i++) {
            dog_counts_dict[dogs_states_array[i]] = 1 + (dog_counts_dict[dogs_states_array[i]] || 0);
        }
        var cat_counts_dict = {};
        for (var i = 0; i < cat_states_array.length; i++) {
            cat_counts_dict[cat_states_array[i]] = 1 + (cat_counts_dict[cat_states_array[i]] || 0);
        }

        //console.log(Object.keys(dog_counts_dict))

        var dog_values = Object.keys(dog_counts_dict).map(function (key) {
            return dog_counts_dict[key];
        });
        var cat_values = Object.keys(cat_counts_dict).map(function (key) {
            return cat_counts_dict[key];
        });

        trace1 = {
            x: Object.keys(dog_counts_dict),
            y: dog_values,
            type: 'bar',
            name: 'Dogs Available'
        };
        trace2 = {
            x: Object.keys(cat_counts_dict),
            y: cat_values,
            type: 'bar',
            name: 'Cats Available'
        };
        var data = [trace1, trace2];

        console.log(trace1)

        var layout = { barmode: 'group' };

        Plotly.newPlot('pet_states_bar', data, layout);
    });
});

d3.json("/dogs-by-age").then(function (dogData, err) {
    d3.json("/cats-by-age").then(function (catData, err) {
        if (err) { throw err };

        dogs_age_array = []
        cat_age_array = []

        for (var i = 0; i < dogData.length; i++) {
            dogs_age_array.push(dogData[i].age);
        }
        for (var i = 0; i < catData.length; i++) {
            cat_age_array.push(catData[i].age);
        }


        var dog_counts_dict = {};
        for (var i = 0; i < dogs_age_array.length; i++) {
            dog_counts_dict[dogs_age_array[i]] = 1 + (dog_counts_dict[dogs_age_array[i]] || 0);
        }
        var cat_counts_dict = {};
        for (var i = 0; i < cat_age_array.length; i++) {
            cat_counts_dict[cat_age_array[i]] = 1 + (cat_counts_dict[cat_age_array[i]] || 0);
        }

        //console.log(Object.keys(dog_counts_dict))

        var dog_values = Object.keys(dog_counts_dict).map(function (key) {
            return dog_counts_dict[key];
        });
        var cat_values = Object.keys(cat_counts_dict).map(function (key) {
            return cat_counts_dict[key];
        });

        var ultimateColors = [
            ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
            ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
            ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
            ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
        ];

        var data = [{
            values: dog_values.sort(),
            labels: Object.keys(dog_counts_dict).sort(),
            type: 'pie',
            name: 'Dog Ages',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'none',
            textinfo: 'label+percent+name',
            title: 'Dog Ages',
            "titlefont": {"size":24}
        }, {
            values: cat_values.sort(),
            labels: Object.keys(cat_counts_dict).sort(),
            type: 'pie',
            name: 'Cat Ages',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 1
            },
            hoverinfo: 'none',
            textinfo: 'label+percent+name',
            title: 'Cat Ages',
            "titlefont": {"size":24}
        }];

        var layout = {
            height: 500,
            width: 1000,
            grid: { rows: 1, columns: 2 },
        };

        Plotly.newPlot('pet_ages_pie', data, layout);
    });
});

d3.json("/dogs-by-sex").then(function (dogData, err) {
    d3.json("/cats-by-sex").then(function (catData, err) {
        if (err) { throw err };

        dogs_sex_array = []
        cat_sex_array = []

        for (var i = 0; i < dogData.length; i++) {
            dogs_sex_array.push(dogData[i].gender);
        }
        for (var i = 0; i < catData.length; i++) {
            cat_sex_array.push(catData[i].gender);
        }


        var dog_counts_dict = {};
        for (var i = 0; i < dogs_sex_array.length; i++) {
            dog_counts_dict[dogs_sex_array[i]] = 1 + (dog_counts_dict[dogs_sex_array[i]] || 0);
        }
        var cat_counts_dict = {};
        for (var i = 0; i < cat_sex_array.length; i++) {
            cat_counts_dict[cat_sex_array[i]] = 1 + (cat_counts_dict[cat_sex_array[i]] || 0);
        }

        //console.log(Object.keys(dog_counts_dict))

        var dog_values = Object.keys(dog_counts_dict).map(function (key) {
            return dog_counts_dict[key];
        });
        var cat_values = Object.keys(cat_counts_dict).map(function (key) {
            return cat_counts_dict[key];
        });

        var ultimateColors = [
            ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
            ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
            ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
            ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
        ];

        var data = [{
            values: dog_values.sort(),
            labels: Object.keys(dog_counts_dict).sort(),
            type: 'pie',
            name: 'Dog Gender',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'none',
            textinfo: 'label+percent+name',
            title: 'Dog Gender',
            "titlefont": {"size":24}
        }, {
            values: cat_values.sort(),
            labels: Object.keys(cat_counts_dict).sort(),
            type: 'pie',
            name: 'Cat Gender',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 1
            },
            hoverinfo: 'none',
            textinfo: 'label+percent+name',
            title: 'Cat Gender',
            "titlefont": {"size":24}
        }];

        var layout = {
            height: 500,
            width: 1000,
            grid: { rows: 1, columns: 2 },
        };

        Plotly.newPlot('pet_sexes_pie', data, layout);
    });
});

d3.json("/find-a-pet/Dog").then(function (dogData, err) {
    d3.json("/find-a-pet/Cat").then(function (catData, err) {
        if (err) { throw err };

        dogs_breed_array = []
        cat_breed_array = []

        for (var i = 0; i < dogData.length; i++) {
            dogs_breed_array.push(dogData[i].breed);
        }
        for (var i = 0; i < catData.length; i++) {
            cat_breed_array.push(catData[i].breed);
        }


        var dog_counts_dict = {};
        for (var i = 0; i < dogs_breed_array.length; i++) {
            dog_counts_dict[dogs_breed_array[i]] = 1 + (dog_counts_dict[dogs_breed_array[i]] || 0);
        }
        var cat_counts_dict = {};
        for (var i = 0; i < cat_breed_array.length; i++) {
            cat_counts_dict[cat_breed_array[i]] = 1 + (cat_counts_dict[cat_breed_array[i]] || 0);
        }

        //console.log(Object.keys(dog_counts_dict))

        var dog_values = Object.keys(dog_counts_dict).map(function (key) {
            return dog_counts_dict[key];
        });
        var cat_values = Object.keys(cat_counts_dict).map(function (key) {
            return cat_counts_dict[key];
        });

        var ultimateColors = [
            ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
            ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
            ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
            ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
        ];

        var data = [{
            values: dog_values,
            labels: Object.keys(dog_counts_dict),
            type: 'pie',
            name: 'Dog Breeds',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                row: 0,
                column: 0
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title: 'Dog Breeds',
            "titlefont": {"size":24}
        }, {
            values: cat_values,
            labels: Object.keys(cat_counts_dict),
            type: 'pie',
            name: 'Cat Breeds',
            marker: {
                colors: ultimateColors[3]
            },
            domain: {
                row: 0,
                column: 1
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none',
            title: 'Cat Breeds',
            "titlefont": {"size":24}
        }];

        var layout = {
            height: 500,
            width: 1000,
            grid: { rows: 1, columns: 2 },
        };

        Plotly.newPlot('pet_breeds_pie', data, layout);
    });
});