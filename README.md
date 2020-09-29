a<h1 align="center">Weather App</h1>

<p align="center">Weather app built with Node, Express, Pug, SASS, Mapbox, OpenWeather and Heroku.</p>

<p align="center"><a href="https://pure-citadel-53256.herokuapp.com/" title="Weather App demo">Demo</a></p>

![demo](/public/images/cover.jpg?raw=true)

A personal project based on [The Complete Node.js Developer Course (3rd Edition)](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13819540#overview) by [Andrew Mead](https://www.udemy.com/user/andrewmead/) on Udemy. One of the projects involved building a basic weather app to search for a location and return the current weather conditions.

I decided to rebuild my [first attempt](https://pbm-nodejs-weather-app.herokuapp.com/) from memory using everything I'd learnt since taking the course. The major changes include:

- Changing the weather service provider to OpenWeather
- Integrating node-sass to write modular CSS
- Adding `navigator.geolocation.getCurrentPosition` to detect the current location
- Various utils methods for string, date and temperature conversion
- Adding forward and reverse geocoding
- Adding Axios to handle AJAX requests
- Adding ES6 spread operators and object destructuring