const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const address = process.argv[2]
if (!address) {
    console.log("adress bilgisini paramtere olarak veriniz.");
}

geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
        return console.log("Hata: ", error);
    }

    forecast(longitude, latitude, (error, forecastData) => {
        console.log(location);
        if (error) {
            return console.log("Hata: ", error);
        }
        console.log(forecastData);
    })
});
