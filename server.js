// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */


app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//get all places
app.get('/api/places', function (req, res){
  db.Place.find({})
  .exec(function(err, places){
    if (err) {
      return console.log("index error: " + err);
      }
      res.json(places);
  });
});
//get one book
// app.get('/api/places/:id', function (req, res){
//   db.Place.findOne({_id: req.params.id}, function(err, data){
//     res.json(data);
//   });
// });

//create new Place -- WORKS
app.post('/api/places', function (req, res){
  var newPlace = new db.Place (req.body);
    newPlace.save(function (err, savedPlace){
      res.json(savedPlace);
    })
})

//delete place
app.delete('/api/books/:id', function(req, res){
  var placeId = req.params.id;
  db.Place.findOneandRemove({ _id : placeId})
    .populate('gps')
    .exec(function (err, deletedPlace){
      res.json(deletedPlace);
    })
})


// db.Places.findOne()



//create new place
// app.post('/api/places', function (req, res){
//
// })


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/stacysn/express-personal-api/blob/master/README.md",
    baseUrl: "https://aqueous-castle-36349.herokuapp.com/",
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      {
        method: "GET",
        path: "/api/profile",
        description: "Data about me"
      },
      {
        method: "GET",
        path: "/api/places",
        description: "Index of all the places"
      },
      {
        method: "POST",
        path: "/api/places",
        description: "Create new places"
      },
      {
        method: "PUT",
        path: "/api/places/:id",
        description: "Edit a previous place entry and update it"
      },
      {
        method: "DELETE",
        path: "/api/places/:id",
        description: "Destroy a place"
      },
    ]
  })
});

app.get('/api/profile', function myProfile(req, res){
  res.json({
    name : "Stacy",
    githubUswername : "stacysn",
    githubLink: "https://github.com/stacysn",
    githubProfileImage:"https://avatars1.githubusercontent.com/u/26883903?v=4&amp;u=8191f1a962e3e7b7f7f14916f75e14aa24a6a876&amp;s=400",
    personalSiteLink: "https://github.com/stacysn/stacysn.github.io",
    currentCity: "San Francisco",
    pets: [
      {
        name: "Angel",
        type: "dog",
        breed: "mixed chihuahua"
      },
      {
        name: "Mimi",
        type: "dog",
        breed: "poodle"
      },
      {
        name: "Fluffy",
        type: "chicken",
        breed: "white"
      },
      {
        name: "Autumn",
        type: "turtle",
        breed: "red ear slider"
      }

    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
