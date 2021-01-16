var apiKey = "3Ud8hCcYPzOVjoAMQCvpuWD5cGpJ1BA60gILI6SIV8BFkPNRRD"
var secret = "WMIebvADWcbwnEcTEFxo3ts52K5yV1M8PcA5Xs5H" 

var pf = new petfinder.Client({apiKey: apiKey, secret: secret});

pf.animal.search()
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        // Handle the error
    });