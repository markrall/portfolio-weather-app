const axios = require('axios');

const geocode = (address, cb) => {
    const MB_API_KEY = process.env.MAPBOX_API_KEY;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?&types=locality&access_token=${MB_API_KEY}&limit=1`;

    const formatData = features => {
        const { place_name, center } = features;
        const [ longitude, latitude ] = center;
        const coords = { latitude, longitude };
        const timestamp = new Date();
        
        return { coords, timestamp, place_name };

    };

    axios.get(url)
        .then(({ data }) => {
            const features = data.features[0];
            
            if (!features || features.length === 0) {
                cb('Unable to find location. Try another search.', undefined);
            } else {
                cb(undefined, formatData(features));
            }
            
        }).catch(err => cb(err, undefined));
};

module.exports = geocode;
