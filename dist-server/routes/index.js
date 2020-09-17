import express from 'express';
var router = express.Router();
import forecast from '../utils/forecast';
import geocode from '../utils/geocode';
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Weather App'
  });
});
/* GET geocodes */

router.get('/geocode', function (req, res, next) {
  var query = req.query.address;

  if (!query) {
    res.send({
      error: 'No address string provided'
    });
  }

  geocode(query, function (error, data) {
    if (error) {
      res.send({
        error: error
      });
    }

    res.send({
      data: data
    });
  });
});
/* GET weather data */

router.get("/weather", function (req, res, next) {
  var query = req.query;

  if (!query) {
    res.send({
      error: "No coordinates provided"
    });
  }

  forecast(query, function (error, data) {
    if (error) {
      return res.send({
        error: error
      });
    } // convert UTC timestamps using console.log(new Date(1597993200*1000)); and format using https://elijahmanor.com/format-js-dates-and-times


    res.send({
      data: data
    });
  });
});
export default router;