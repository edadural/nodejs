const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?proximity=ip&access_token=pk.eyJ1IjoiaG15cmNtbiIsImEiOiJjbHR6aW00enUwMGRuMmp0NGNyczVseGxuIn0.qgdxfBjW5ccrcv4JUd1yJw`;

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Geocoding servisine bağlanamadı", undefined);
        } else if (body.features.length === 0) {
            callback("Belirtilen konum bulunamadı.", undefined);
        } else {
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined, { latitude, longitude, location });
        }
    });
};

module.exports = geocode;
