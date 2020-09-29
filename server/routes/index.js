const express = require('express');
const router = express.Router();

const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Weather App'
  });

});

/* GET geocodes */
router.get('/geocode', (req, res, next) => {
  const query = req.query.address;

  if (!query) {
    res.send({ error: 'No address string provided' });
  }

  geocode(query, (error, data) => {
    if (error) {
      res.send({ error });
    }

    res.send({ data });

  });

});

/* GET weather data */
router.get(`/weather`, (req, res, next) => {
  const query = req.query;

  if (!query) {
    res.send({ error: "No coordinates provided" });

  }

  forecast(query, (error, data) => {
    if (error) {
      return res.send({ error });

    }
    
    res.send({ data });

  });
  
});

module.exports = router;
