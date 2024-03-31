const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const address = process.argv[2]
if (!address) {
    console.log("adress bilgisini paramtere olarak veriniz.");
}

geocode(address, (error, data) => {
    if (error) {
        return console.log("Hata: ", error);
    }

    forecast(data.longitude, data.latitude, (error, forecastData) => {
        if (error) {
            return console.log("Hata: ", error);
        }
        console.log(data.location);
        console.log(forecastData);
    })
});
