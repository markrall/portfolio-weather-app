function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { formatDate, formatTime, fetchTempUM, fetchSpeedUM, fetchUnitPref } from './utils.js';
import { renderCurrentForecast, renderFiveDayForecast } from './templates.js';
var $ = document.querySelector.bind(document);
var bodyElem = $('body');
var searchLocationForm = $('#search-location-form');
var locationInput = $('#location-input');
var useCurrentLocation = $('#current-location');
var tempSwitch = $('#s1');
var wfcDiv = $('#wfc');
var wfdDiv = $('#wfd');
var cfg = {
  unitPref: 'metric',
  tempUnit: '&#8451;',
  speedUnit: 'm/s',
  position: ''
};

var renderForecast = function renderForecast(obj) {
  var time = obj.time,
      data = obj.data;
  var _data$data = data.data,
      current = _data$data.current,
      daily = _data$data.daily;
  wfcDiv.innerHTML = renderCurrentForecast(_objectSpread(_objectSpread(_objectSpread({}, current), cfg), {}, {
    time: time
  }));
  wfdDiv.innerHTML = renderFiveDayForecast(_objectSpread({
    daily: daily
  }, cfg));
};

var fetchWeatherData = function fetchWeatherData() {
  var _cfg$position = cfg.position,
      coords = _cfg$position.coords,
      timestamp = _cfg$position.timestamp;
  var latitude = coords.latitude,
      longitude = coords.longitude;
  var time = "".concat(formatDate(timestamp), " ").concat(formatTime(timestamp));
  var lang = 'en';
  var url = "/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&unt=").concat(cfg.unitPref, "&lan=").concat(lang);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error) {
      console.error(data.error);
      console.log('Invalide coordinates');
    } else {
      bodyElem.setAttribute('class', "bg".concat(data.data.current.weather[0].icon));
      renderForecast({
        time: time,
        data: data
      });
    }
  })["catch"](console.error);
};

var fetchCurrentLocation = function fetchCurrentLocation(cb) {
  navigator.geolocation.getCurrentPosition(function (position) {
    cfg.position = position;
    cb();
  });
};

if ('geolocation' in navigator) {
  window.onload = function () {
    fetchCurrentLocation(function () {
      fetchWeatherData();
    });
  };

  useCurrentLocation.addEventListener('click', function (event) {
    event.preventDefault();
    fetchCurrentLocation(function () {
      fetchWeatherData();
    });
  });
}

var fetchLocationData = function fetchLocationData(locationString, cb) {
  var url = "/geocode?address=".concat(locationString);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (body) {
    if (body.error) {
      console.error(body.error);
    } else {
      cb(body.data);
    }
  })["catch"](console.error);
};

tempSwitch.addEventListener('change', function (event) {
  cfg.unitPref = fetchUnitPref(tempSwitch);
  cfg.tempUnit = fetchTempUM(cfg.unitPref);
  cfg.speedUnit = fetchSpeedUM(cfg.unitPref);
  fetchWeatherData();
});
searchLocationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  fetchLocationData(locationInput.value, function (position) {
    cfg.position = position;
    fetchWeatherData();
  });
  locationInput.value = '';
});