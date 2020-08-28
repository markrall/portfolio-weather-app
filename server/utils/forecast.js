// ### Weather APIs
// #### OpenWeather
// DOCS: https://openweathermap.org/api/one-call-api

const axios = require('axios');

const forecast = ({
            lat= `-33.856579`, 
            lon= `151.215297`, 
            lan= 'en', 
            unt= 'metric'
        } = {}, cb) => {

    const API_KEY = process.env.OPENWEATHER_API_KEY;

    const url = encodeURI(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unt}&exclude=minutely,hourly&appid=${API_KEY}&lang=${lan}`);

    axios.get(url)
        .then(({ data }) => cb(undefined, data))
        .catch(err => cb(err, undefined));
}

module.exports = forecast;