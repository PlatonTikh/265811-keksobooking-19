'use strict'
// empty array
var array = [];
// rooms number
var ROOMS = [2, 6];
var GUEST_MIN_MAX = [1, 4];
var Y_MIN_MAX = [130, 630];
var PRICE_MIN_MAX = [300, 5000];
// types
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
//
var CHECKIN = ['12:00', '13:00', '14:00'];
//
var CHECKOUT = ['12:00', '13:00', '14:00'];
// features
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

// function to generate integer between min and max
var generateRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
// function to generate random number of objects
var generateRandomIndices = function (min_obj, max_obj, min, max) {
  var nObjects = generateRandomNumber(min_obj, max_obj);
  var randomIndices = [];
  for (var i = 0; i < nObjects; i++) {
    var ind = generateRandomNumber(min, max);
    randomIndices.push(ind);
  }
  return randomIndices;
}
// generate random data
var getRandomObjects = function (number) {
  for (var i = 0; i < number; i++) {
    var avatarNumber = generateRandomNumber(1, 8);
    var xLoc = generateRandomNumber(100, 200);
    var yLoc = generateRandomNumber(Y_MIN_MAX[0], Y_MIN_MAX[1]);
    var price = generateRandomNumber(PRICE_MIN_MAX[0], PRICE_MIN_MAX[1]);
    var type = TYPES[generateRandomNumber(0, TYPES.length - 1)];
    var rooms = generateRandomNumber(ROOMS[0], ROOMS[1]);
    var guests = generateRandomNumber(GUEST_MIN_MAX[0], GUEST_MIN_MAX[1]);
    var chekin = CHECKIN[generateRandomNumber(0, CHECKIN.length - 1)]
    var chekout = CHECKOUT[generateRandomNumber(0, CHECKOUT.length - 1)]
    var features = FEATURES[generateRandomIndices(1, FEATURES.length, 0, FEATURES.length - 1)]
    var photos = PHOTOS[generateRandomIndices(1, PHOTOS.length, 0, PHOTOS.length - 1)]
    var object = {
      'author': {
        'avatar': 'img/avatars/user0' + avatarNumber + '.png'
      },
      'offer': {
        'title': 'Hi',
        'address': xLoc + ', ' + yLoc,
        'price': price;,
        'type': type,
        'rooms': rooms,
        'guests': guests,
        'checkin': chekin,
        'checkout': chekout,
        'features': features,
        'description': 'Hello!',
        'photos': photos
      },
      'location': {
        'x': xLoc,
        'y': yLoc
      }
    }
  }
}
