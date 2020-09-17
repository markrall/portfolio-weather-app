// ### Weather APIs
// #### OpenWeather
// DOCS: https://openweathermap.org/api/one-call-api
var axios = require('axios');

var forecast = function forecast() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$lat = _ref.lat,
      lat = _ref$lat === void 0 ? "-33.856579" : _ref$lat,
      _ref$lon = _ref.lon,
      lon = _ref$lon === void 0 ? "151.215297" : _ref$lon,
      _ref$lan = _ref.lan,
      lan = _ref$lan === void 0 ? 'en' : _ref$lan,
      _ref$unt = _ref.unt,
      unt = _ref$unt === void 0 ? 'metric' : _ref$unt;

  var cb = arguments.length > 1 ? arguments[1] : undefined;
  var API_KEY = process.env.OPENWEATHER_API_KEY;
  var url = encodeURI("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&units=").concat(unt, "&exclude=minutely,hourly&appid=").concat(API_KEY, "&lang=").concat(lan));
  axios.get(url).then(function (_ref2) {
    var data = _ref2.data;
    return cb(undefined, data);
  })["catch"](function (err) {
    return cb(err, undefined);
  });
};

module.exports = forecast;