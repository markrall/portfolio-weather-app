const getCardinal = angle => {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;
  
    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "NW";
};

const formatDate = (stamp, format) => {
  const timestamp = new Date(stamp);
  format = format || 'long';

  return format === 'short'
    ? timestamp.toLocaleDateString('en-UK', {
      weekday: 'short'
    })
    : timestamp.toLocaleDateString('en-UK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

};

const formatTime = stamp => {
    const timestamp = new Date(stamp);
    const time = timestamp.toLocaleTimeString('en-AU', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });

    return time;
};

const fetchTempUM = (unit) => {
  return unit === 'metric' ? '&#8451;' : '&#8457;';
};

const fetchSpeedUM = (unit) => {
  return unit === 'metric' ? 'm/s' : 'mph;';
};

const fetchUnitPref = (tempSwitch) => {
  return !tempSwitch.checked ? 'metric' : 'imperial';
};

const toSentenceCase = str => 
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const formatNum = num => 
  num.toFixed(0);


export { 
  formatDate, 
  formatTime, 
  getCardinal,
  fetchTempUM,
  fetchSpeedUM,
  fetchUnitPref,
  toSentenceCase,
  formatNum
};