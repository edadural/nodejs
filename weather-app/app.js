const request = require('postman-request')

const url = 'http://api.weatherstack.com/current?access_key=5c3376fd0dd61382d80dc06521e4bf2a&query=37.8267,-122.4233&units=f'

request({ url: url, json: true }, (error, response) => {

    if (error) {
        console.log("Hava durumu servisine bağlantı kurulamadı.");
    } else if (response.body.error) {
        console.log("Girilen konum bilgisi bulunamadı");
    } else {
        console.log("Hava sıcaklığı: " + response.body.current.temperature
            + " Hissedilen: " + response.body.current.feelslike);
    }

})

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bursa.json?proximity=ip&access_token=pk.eyJ1IjoiaG15cmNtbiIsImEiOiJjbHR6aW00enUwMGRuMmp0NGNyczVseGxuIn0.qgdxfBjW5ccrcv4JUd1yJw'

request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
        console.log("Hata oluştu: ", error);
    } else if (response.body.features.length === 0) {
        console.log("Belirtilen konum bulunamadı.");
    } else {
        const longitude = response.body.features[0].center[0];
        const latitude = response.body.features[0].center[1];
        console.log("Enlem: " + longitude + ", Boylam: " + latitude);
    }
})

