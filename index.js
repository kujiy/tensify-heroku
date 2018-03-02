var express = require('express')
var tensify = require('tensify');

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Add headers
// necessary for ajax execution
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/*', function(req, response) {

    // localhost:5000/do -> do
    // localhost:5000/do/ -> do/
    var verb = req.params[0].replace("/", "");
    console.log("verb="+verb);

    // Convert verb to past tence "do" -> 'did'
    try {
        var out = tensify(verb).past;
    }
    catch (e) {
        var out = verb;
    }

    response.send(out);

})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


