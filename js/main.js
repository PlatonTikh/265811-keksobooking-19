'use strict';
var ELEMENT_NUMBER = 8;
var ROOMS = [1, 4];
var GUEST_LIMITS = [1, 4];
var Y_LIMITS = [130, 630];
var X_LIMITS = [200, 800];
var PRICE_LIMITS = [500, 10000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
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
// function to take random number of objects from data
var generateRandomParts = function (minobj, maxobj, min, max, data) {
  var indices = generateRandomIndices(minobj, maxobj, min, max);
  var number = indices.length;
  var parts = [];
  for (var l = 0; l < number; l++) {
    parts.push(data[indices[l]]);
  }
  return parts;
};

var labelTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// generate random data
var getRandomObject = function () {
  var xx = generateRandomNumber(1, 8);
  var xLoc = generateRandomNumber(X_LIMITS[0], X_LIMITS[1]);
  var yLoc = generateRandomNumber(Y_LIMITS[0], Y_LIMITS[1]);
  var price = generateRandomNumber(PRICE_LIMITS[0], PRICE_LIMITS[1]);
  var type = TYPES[generateRandomNumber(0, TYPES.length - 1)];
  var rooms = generateRandomNumber(ROOMS[0], ROOMS[1]);
  var guests = generateRandomNumber(GUEST_LIMITS[0], GUEST_LIMITS[1]);
  var chekin = CHECKINS[generateRandomNumber(0, CHECKINS.length - 1)];
  var chekout = CHECKOUTS[generateRandomNumber(0, CHECKOUTS.length - 1)];
  var features = generateRandomParts(1, FEATURES.length, 0, FEATURES.length - 1, FEATURES);
  var photos = generateRandomParts(1, PHOTOS.length, 0, PHOTOS.length - 1, PHOTOS);
  var RandomObject = {
    'author': {
      'avatar': 'img/avatars/user0' + xx.toString() + '.png'
    },
    'offer': {
      'title': 'Тебе к нам)',
      'address': xLoc.toString() + ', ' + yLoc.toString(),
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': chekin,
      'checkout': chekout,
      'features': features,
      'description': 'Лучшие номера только у нас! Спешите забронировать!',
      'photos': photos
    },
    'location': {
      'x': xLoc,
      'y': yLoc
    }
  };

  return RandomObject;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
// creating element based on template with details from data
var createElementFromData = function (template) {
  var data = getRandomObject();
  var newElement = template.cloneNode(true);
  newElement.style = 'left: ' + data.location.x.toString() + 'px; top: ' + data.location.y.toString() + 'px';
  newElement.innerHTML = '<img src="' + data.author.avatar + '" width="40" height="40" draggable="false" alt="' + data.offer.title + '">';
  return newElement;
};
// place to fill with new elements
var mapPins = document.querySelector('.map__pins');
// filling container with new elements
var fillDomWithElements = function (container) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < ELEMENT_NUMBER; k++) {
    fragment.appendChild(createElementFromData(labelTemplate));
  }
  container.appendChild(fragment);
};

fillDomWithElements(mapPins);
