var getCardinal = function getCardinal(angle) {
  var degreePerDirection = 360 / 8;
  var offsetAngle = angle + degreePerDirection / 2;
  return offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection ? "N" : offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection ? "NE" : offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection ? "E" : offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection ? "SE" : offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection ? "S" : offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection ? "SW" : offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection ? "W" : "NW";
};

var formatDate = function formatDate(stamp, format) {
  var timestamp = new Date(stamp);
  format = format || 'long';
  return format === 'short' ? timestamp.toLocaleDateString('en-UK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  }) : timestamp.toLocaleDateString('en-UK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

var formatTime = function formatTime(stamp) {
  var timestamp = new Date(stamp);
  var time = timestamp.toLocaleTimeString('en-AU', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
  return time;
};

var fetchTempUM = function fetchTempUM(unit) {
  return unit === 'metric' ? '&#8451;' : '&#8457;';
};

var fetchSpeedUM = function fetchSpeedUM(unit) {
  return unit === 'metric' ? 'm/s' : 'mph;';
};

var fetchUnitPref = function fetchUnitPref(tempSwitch) {
  return !tempSwitch.checked ? 'metric' : 'imperial';
};

export { formatDate, formatTime, getCardinal, fetchTempUM, fetchSpeedUM, fetchUnitPref };