import { formatDate, formatTime, getCardinal } from './utils.js';

var iconURL = function iconURL(icon) {
  return "<img src=\"http://openweathermap.org/img/wn/".concat(icon, ".png\" />");
};

var renderCurrentForecast = function renderCurrentForecast(forecast) {
  var weather = forecast.weather,
      temp = forecast.temp,
      feels_like = forecast.feels_like,
      wind_speed = forecast.wind_speed,
      wind_deg = forecast.wind_deg,
      pressure = forecast.pressure,
      humidity = forecast.humidity,
      uvi = forecast.uvi,
      sunrise = forecast.sunrise,
      sunset = forecast.sunset,
      dew_point = forecast.dew_point,
      visibility = forecast.visibility,
      tempUnit = forecast.tempUnit,
      speedUnit = forecast.speedUnit,
      time = forecast.time;
  return "\n        ".concat(iconURL(weather[0].icon), "\n        <p>Current tmp: ").concat(temp.toFixed(1), " ").concat(tempUnit, "</p>\n        <p>Feels like: ").concat(feels_like.toFixed(1), " ").concat(tempUnit, "</p>\n        <p>").concat(weather[0].description, "</p>\n        <p>Wind: ").concat(wind_speed, " ").concat(speedUnit, " ").concat(getCardinal(wind_deg), "</p>\n        <p>Pressure: ").concat(pressure, "hPa</p>\n        <p>Humidity: ").concat(humidity, "%</p>\n        <p>UV Index: ").concat(uvi.toFixed(0), "</p>\n        <p>Sunrise: ").concat(formatTime(sunrise * 1000), "</p>\n        <p>Sunset: ").concat(formatTime(sunset * 1000), "</p>\n        <p>Dewpoint: ").concat(dew_point.toFixed(1), " ").concat(tempUnit, "</p>\n        <p>Visbility: ").concat(visibility / 1000, " km</p>\n        <p><small>Data retrieved at: ").concat(time, ".</small></p>\n    ");
};

var renderFiveDayForecast = function renderFiveDayForecast(forecast) {
  var daily = forecast.daily,
      tempUnit = forecast.tempUnit,
      speedUnit = forecast.speedUnit;
  var wfdTpl = "<h2 class=\"title\">5 day forecast</h2>";
  daily.map(function (value, index) {
    var dt = value.dt,
        weather = value.weather,
        temp = value.temp,
        wind_speed = value.wind_speed,
        wind_deg = value.wind_deg,
        pressure = value.pressure,
        humidity = value.humidity,
        uvi = value.uvi,
        dew_point = value.dew_point;
    if (index <= 0 || index > 5) return;
    wfdTpl = wfdTpl + "\n            <article class=\"day".concat(index, "\">\n                <h3>").concat(formatDate(dt * 1000, 'short'), "</h3>\n                ").concat(iconURL(weather[0].icon), "\n                <p>Max: ").concat(temp.max.toFixed(1), " ").concat(tempUnit, "</p>\n                <p>Min: ").concat(temp.min.toFixed(1), " ").concat(tempUnit, "</p>\n                <p>").concat(weather[0].description, "</p>\n                <p>Wind: ").concat(wind_speed, " ").concat(speedUnit, " ").concat(getCardinal(wind_deg), "</p>\n                <p>Pressure: ").concat(pressure, "hPa</p>\n                <p>Humidity: ").concat(humidity, "%</p>\n                <p>UV Index: ").concat(uvi.toFixed(0), "</p>\n                <p>Dewpoint: ").concat(dew_point.toFixed(1), " ").concat(tempUnit, "</p>\n            </article>\n        ");
  });
  return wfdTpl;
};

export { iconURL, renderCurrentForecast, renderFiveDayForecast };