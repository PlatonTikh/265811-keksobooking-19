'use strict';
// empty array
var array = [];
//
var ARRAY_ELEMENT_NUMBER = 8;
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
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// function to generate integer between min and max
var generateRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
// function to generate random number of objects
var generateRandomIndices = function (minobj, maxobj, min, max) {
  var nObjects = generateRandomNumber(minobj, maxobj);
  var randomIndices = [];
  for (var i = 0; i < nObjects; i++) {
    var ind = generateRandomNumber(min, max);
    randomIndices.push(ind);
  }
  return randomIndices;
};

var generateRandomParts = function (minobj, maxobj, min, max, data) {
  var indices = generateRandomIndices(minobj, maxobj, min, max);
  var number = indices.length;
  var parts = [];
  for (var l = 0; l < number; l++) {
    parts.push(data[indices[l]]);
  }
  return parts;
};

// generate random data
var getRandomObject = function () {
  var xx = generateRandomNumber(1, 8);
  var xLoc = generateRandomNumber(200, 500);
  var yLoc = generateRandomNumber(Y_MIN_MAX[0], Y_MIN_MAX[1]);
  var price = generateRandomNumber(PRICE_MIN_MAX[0], PRICE_MIN_MAX[1]);
  var type = TYPES[generateRandomNumber(0, TYPES.length - 1)];
  var rooms = generateRandomNumber(ROOMS[0], ROOMS[1]);
  var guests = generateRandomNumber(GUEST_MIN_MAX[0], GUEST_MIN_MAX[1]);
  var chekin = CHECKIN[generateRandomNumber(0, CHECKIN.length - 1)];
  var chekout = CHECKOUT[generateRandomNumber(0, CHECKOUT.length - 1)];
  var features = generateRandomParts(1, FEATURES.length, 0, FEATURES.length - 1, FEATURES);
  var photos = generateRandomParts(1, PHOTOS.length, 0, PHOTOS.length - 1, PHOTOS);
  var object = {
    'author': {
      'avatar': 'img/avatars/user0' + xx + '.png'
    },
    'offer': {
      'title': 'Hi',
      'address': xLoc + ', ' + yLoc,
      'price': price,
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
  };
  return object;
};

for (var j = 0; j < ARRAY_ELEMENT_NUMBER; j++) {
  var currObject = getRandomObject();
  array.push(currObject);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
var templ = document.querySelector('.map__pins');
var createButtons = function () {
  var buttonParams = getRandomObject();
  var butt = mapPin.cloneNode(true);
  butt.style = 'left: ' + buttonParams.location.x + 'px; top: ' + buttonParams.location.y + 'px';
  butt.innerHTML = '<img src="' + buttonParams.author.avatar + '" width="40" height="40" draggable="false" alt="' + buttonParams.offer.title + '">';
  return butt;
};
createButtons()
var fragment = document.createDocumentFragment();
for (var k = 0; k < ARRAY_ELEMENT_NUMBER; k++) {
  fragment.appendChild(createButtons(k));
}
templ.appendChild(fragment)
