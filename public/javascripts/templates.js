import { 
    formatDate, 
    formatTime, 
    getCardinal
} from './utils.js';

const iconURL = icon => 
        `<img src="http://openweathermap.org/img/wn/${icon}.png" />`;

const renderCurrentForecast = (forecast) => {
    const { 
        weather,
        temp,
        feels_like,
        wind_speed,
        wind_deg,
        pressure,
        humidity,
        uvi,
        sunrise,
        sunset,
        dew_point,
        visibility,
        tempUnit,
        speedUnit,
        time
    } = forecast;

    return `
        ${iconURL(weather[0].icon)}
        <p>Current tmp: ${temp.toFixed(1)} ${tempUnit}</p>
        <p>Feels like: ${feels_like.toFixed(1)} ${tempUnit}</p>
        <p>${weather[0].description}</p>
        <p>Wind: ${wind_speed} ${speedUnit} ${getCardinal(wind_deg)}</p>
        <p>Pressure: ${pressure}hPa</p>
        <p>Humidity: ${humidity}%</p>
        <p>UV Index: ${uvi.toFixed(0)}</p>
        <p>Sunrise: ${formatTime(sunrise*1000)}</p>
        <p>Sunset: ${formatTime(sunset*1000)}</p>
        <p>Dewpoint: ${dew_point.toFixed(1)} ${tempUnit}</p>
        <p>Visbility: ${visibility/1000} km</p>
        <p><small>Data retrieved at: ${time}.</small></p>
    `;

};

const renderFiveDayForecast = (forecast) => {
    const {
        daily,
        tempUnit,
        speedUnit
    } = forecast;
    let wfdTpl = `<h2 class="title">5 day forecast</h2>`;

    daily.map((value, index) => {
        const {
            dt,
            weather,
            temp,
            wind_speed,
            wind_deg,
            pressure,
            humidity,
            uvi,
            dew_point
        } = value;

        if(index <= 0 || index > 5) return;

        wfdTpl = wfdTpl + `
            <article class="day${index}">
                <h3>${formatDate(dt*1000, 'short')}</h3>
                ${iconURL(weather[0].icon)}
                <p>Max: ${temp.max.toFixed(1)} ${tempUnit}</p>
                <p>Min: ${temp.min.toFixed(1)} ${tempUnit}</p>
                <p>${weather[0].description}</p>
                <p>Wind: ${wind_speed} ${speedUnit} ${getCardinal(wind_deg)}</p>
                <p>Pressure: ${pressure}hPa</p>
                <p>Humidity: ${humidity}%</p>
                <p>UV Index: ${uvi.toFixed(0)}</p>
                <p>Dewpoint: ${dew_point.toFixed(1)} ${tempUnit}</p>
            </article>
        `;
    });

    return wfdTpl;
};









export {
    iconURL,
    renderCurrentForecast,
    renderFiveDayForecast
};