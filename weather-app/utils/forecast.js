const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=77ce69c14f63baae1cc568a54e347187&query=" + encodeURIComponent(longitude) + "," + encodeURIComponent(latitude)

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Hava durumu servisine bağlantı kurulamadı.", undefined);
        } else if (response.body.error) {
            callback("Girilen konum bilgisi bulunamadı", undefined);
        } else {
            const temperature = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            callback(undefined, { temperature, feelslike });
        }
    })
};

module.exports = forecast;