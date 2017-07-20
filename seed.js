// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
//
var db = require('./models');

var placeData = [
  {
    description: "Born and grew up here",
    town: "Yuba City",
    state: "California",
    country: "United States",
    years: 18,
    gps: {
      lat: 39.13,
      lng: 121.61
    },
    photo: "/public/images/yubaCity.jpeg"
  },
  {
    description: "Went to college here",
    town: "Santa Cruz",
    state: "California",
    country: "United States",
    years: 4,
    gps: {
      lat: 36.97,
      lng: 122.03
    },
    photo: "/public/images/IMG_2525.jpg"
  },
  {
    description: "Study abroad program",
    town: "Copenhagen",
    country: "Denmark",
    years: 0.5,
    gps: {
      lat: 55.68,
      lng: 12.57
    },
    photo: "/public/images/IMG_0856.JPG"
  },
  {
    description: "Current city",
    town: "San Francisco",
    state: "California",
    country: "United States",
    years: 0.3,
    gps: {
      lat: 37.77,
      lng: 122.42
    },
    photo: "/public/images/sf.jpeg"
  }
];


  db.Place.remove({}, function(err, place) {
      db.Place.create(placeData, function(err, places) {
          if (err) { return console.log('ERROR', err); }
          console.log("all places: ", places);
          console.log("created ", placeData.length, " places");
          process.exit();
      }); //closes create function
  }); //closes remove function
