'use strict';
var ELEMENT_NUMBER = 8;
var ROOMS_LIMITS = {
  min: 1,
  max: 4
};
var GUEST_LIMITS = {
  min: 1,
  max: 4
};
var Y_LIMITS = {
  min: 160,
  max: 630
};
var X_LIMITS = {
  min: 200,
  max: 800
};
var PRICE_LIMITS = {
  min: 500,
  max: 10000
};
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// function to generate integer between min and max
var generateRandomInt = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
};
// function to generate random number of objects
var generateRandomIndices = function (minobj, maxobj, min, max) {
  var nObjects = generateRandomInt(minobj, maxobj);
  var randomIndices = [];

  for (var i = 0; i < nObjects; i++) {
    var ind = generateRandomInt(min, max);
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

var getRandomObject = function () {
  var avatarNumber = generateRandomInt(1, 8);
  var xLoc = generateRandomInt(X_LIMITS.min, X_LIMITS.max);
  var yLoc = generateRandomInt(Y_LIMITS.min, Y_LIMITS.max);
  var price = generateRandomInt(PRICE_LIMITS.min, PRICE_LIMITS.max);
  var type = TYPES[generateRandomInt(0, TYPES.length - 1)];
  var rooms = generateRandomInt(ROOMS_LIMITS.min, ROOMS_LIMITS.max);
  var guests = generateRandomInt(GUEST_LIMITS.min, GUEST_LIMITS.max);
  var chekin = CHECKINS[generateRandomInt(0, CHECKINS.length - 1)];
  var chekout = CHECKOUTS[generateRandomInt(0, CHECKOUTS.length - 1)];
  var features = generateRandomParts(1, FEATURES.length, 0, FEATURES.length - 1, FEATURES);
  var photos = generateRandomParts(1, PHOTOS.length, 0, PHOTOS.length - 1, PHOTOS);

  return {
    author: {
      avatar: 'img/avatars/user0' + avatarNumber.toString() + '.png'
    },
    offer: {
      title: 'Тебе к нам)',
      address: xLoc.toString() + ', ' + yLoc.toString(),
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: chekin,
      checkout: chekout,
      features: features,
      description: 'Лучшие номера только у нас! Спешите забронировать!',
      photos: photos
    },
    location: {
      x: xLoc,
      y: yLoc
    }
  };
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

var fillDomWithElements = function (container) {
  var fragment = document.createDocumentFragment();

  for (var k = 0; k < ELEMENT_NUMBER; k++) {
    fragment.appendChild(createElementFromData(labelTemplate));
  }
  container.appendChild(fragment);
};

fillDomWithElements(mapPins);
