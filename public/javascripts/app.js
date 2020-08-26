import { 
    formatDate, 
    formatTime, 
    fetchTempUM,
    fetchSpeedUM,
    fetchUnitPref
} from './utils.js';

import {
    renderCurrentForecast,
    renderFiveDayForecast 
} from './templates.js'


const $ = document.querySelector.bind(document);
const bodyElem = $('body');
const searchLocationForm = $('#search-location-form');
const locationInput = $('#location-input');
const useCurrentLocation = $('#current-location');
const tempSwitch = $('#s1');
const wfcDiv = $('#wfc');
const wfdDiv = $('#wfd');
const cfg = {
    unitPref: 'metric',
    tempUnit: '&#8451;',
    speedUnit: 'm/s',
    position: ''
};


const renderForecast = (obj) => {
    const { time, data } = obj;
    const { current, daily } = data.data;

    wfcDiv.innerHTML = renderCurrentForecast({ 
        ...current, 
        ...cfg, 
        time 
    });

    wfdDiv.innerHTML = renderFiveDayForecast({
        daily,
        ...cfg
    });
};


const fetchWeatherData = () => {
    const { coords, timestamp } = cfg.position;
    const { latitude, longitude} = coords;
    const time = `${formatDate(timestamp)} ${formatTime(timestamp)}`;
    const lang = 'en';
    const url = `/weather?lat=${latitude}&lon=${longitude}&unt=${cfg.unitPref}&lan=${lang}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                console.log('Invalide coordinates');
            } else {
                bodyElem.setAttribute('class', 
                    `bg${data.data.current.weather[0].icon}`);
                renderForecast({time, data});
            }
            
        })
        .catch(console.error);

};


const fetchCurrentLocation = (cb) => {
    navigator.geolocation.getCurrentPosition((position) => {
        cfg.position = position;
        cb();
    });

};


if('geolocation' in navigator) {
    window.onload = () => {
        fetchCurrentLocation(() => {
            fetchWeatherData();
        });
    };

    useCurrentLocation.addEventListener('click', (event) => {
        event.preventDefault();
        fetchCurrentLocation(() => {
            fetchWeatherData();
        });
    });
}


const fetchLocationData = (locationString, cb) => {
    const url = `/geocode?address=${locationString}`;

    fetch(url)
        .then(res => res.json())
        .then(body => {
            if (body.error) {
                console.error(body.error);
            } else {
                cb(body.data);
            }
            
        })
        .catch(console.error);

};


tempSwitch.addEventListener('change', (event) => {
    cfg.unitPref = fetchUnitPref(tempSwitch);
    cfg.tempUnit = fetchTempUM(cfg.unitPref);
    cfg.speedUnit = fetchSpeedUM(cfg.unitPref);

    fetchWeatherData();
});


searchLocationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    fetchLocationData(locationInput.value, position => {
        cfg.position = position;
        fetchWeatherData();
    });

    locationInput.value = '';

});