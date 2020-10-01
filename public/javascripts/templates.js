import { 
    formatDate, 
    formatTime, 
    getCardinal,
    toSentenceCase,
    formatNum
} from './utils.js';

const iconURL = (icon, size) => {
    let iconSize = '';

    switch (size) {
        case 'l':
            iconSize = '@4x';
            break
        case 'm':
            iconSize = '@2x';
            break;
        default:
            iconSize = '';
    }

    return `<img src="https://openweathermap.org/img/wn/${icon}${iconSize}.png" />`;
}

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
        <article>
            ${iconURL(weather[0].icon, 'l')}

            <h4>${toSentenceCase(weather[0].description)}</h4>
            <span class="current-temp">${formatNum(temp)} <sup>${tempUnit}</sup></span>
            <span class="feels-like">Feels like ${formatNum(feels_like)} <sup>${tempUnit}</sup></span>

            <ul>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-wind"></use>
                    </svg> 
                    Wind: ${wind_speed} ${speedUnit} ${getCardinal(wind_deg)}</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-compass-west"></use>
                    </svg> 
                    Pressure: ${pressure}hPa</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-raindrop"></use>
                    </svg> 
                    Humidity: ${humidity}%</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-sun"></use>
                    </svg> 
                    UV Index: ${formatNum(uvi)}</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-raindrop"></use>
                    </svg> 
                    Dewpoint: ${formatNum(dew_point)} <sup>${tempUnit}</sup></li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-eye"></use>
                    </svg> 
                    Visbility: ${visibility/1000} km</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-sunrise"></use>
                    </svg> 
                    Sunrise: ${formatTime(sunrise*1000)}</li>
                <li>
                    <svg>
                        <use xlink:href="/images/svg/symbol-defs.svg#icon-sunset"></use>
                    </svg> 
                    Sunset: ${formatTime(sunset*1000)}</li>
            </ul>      
            <p><small>Data retrieved at: ${time}.</small></p>
        </article>
    `;

};

const renderFiveDayForecast = (forecast) => {
    const {
        daily,
        tempUnit,
        speedUnit
    } = forecast;
    let wfdTpl = ``;

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
                ${iconURL(weather[0].icon, 'm')} 

                <h4>${formatDate(dt*1000, 'short')}</h4>

                <h5>${toSentenceCase(weather[0].description)}</h5>

                <ul>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-thermometer-half"></use>
                        </svg> 
                        ${formatNum(temp.min)} <sup>${tempUnit}</sup>  / 
                        ${formatNum(temp.max)} <sup>${tempUnit}</sup></li>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-wind"></use>
                        </svg> 
                        ${wind_speed} ${speedUnit} ${getCardinal(wind_deg)}</li>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-compass-west"></use>
                        </svg> 
                        ${pressure}hPa</li>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-raindrop"></use>
                        </svg> 
                        ${humidity}%</li>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-sun"></use>
                        </svg> 
                        ${formatNum(uvi)}</li>
                    <li>
                        <svg>
                            <use xlink:href="/images/svg/symbol-defs.svg#icon-raindrop"></use>
                        </svg> 
                        ${formatNum(dew_point)} <sup>${tempUnit}</sup></li>
                </ul>
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