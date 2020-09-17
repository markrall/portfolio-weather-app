function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var axios = require('axios');

var geocode = function geocode(address, cb) {
  var MB_API_KEY = process.env.MAPBOX_API_KEY;
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(address), ".json?access_token=").concat(MB_API_KEY, "&limit=1");

  var formatData = function formatData(features) {
    var place_name = features.place_name,
        center = features.center;

    var _center = _slicedToArray(center, 2),
        longitude = _center[0],
        latitude = _center[1];

    var coords = {
      latitude: latitude,
      longitude: longitude
    };
    var timestamp = new Date();
    return {
      coords: coords,
      timestamp: timestamp,
      place_name: place_name
    };
  };

  axios.get(url).then(function (_ref) {
    var data = _ref.data;
    var features = data.features[0];

    if (!features || features.length === 0) {
      cb('Unable to find location. Try another search.', undefined);
    } else {
      cb(undefined, formatData(features));
    }
  })["catch"](function (err) {
    return cb(err, undefined);
  });
};

module.exports = geocode;