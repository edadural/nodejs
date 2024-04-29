const exp = require('constants')
const express = require('express')
const path = require('path')
const hbs = require("hbs")

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

app.set('view engine', 'hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const viewsPath = path.join(__dirname, '../public/templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../public/templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hava Durumu Uygulaması',
        name: 'Eda'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hakkımızda',
        name: 'Eda'
    })
})

// text router
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search parametresi girilmemiş'
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Yardım sayfası',
        name: 'Eda',
        helpText: 'Bu bir deneme yazısıdır.'
    })
})

// app.com: app.com, app.com/help, app.com/about

// app.get('', (req, res) => {
//     res.send('<h1>Hava Durumu</h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Hakkımızda sayfası</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Adres parametresi girilmemiş'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        console.log("long: ", longitude, "lati: ", latitude);

        forecast(longitude, latitude, (error, forecastData) => {
            
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })

    });

})

// app.get('/help', (req, res) => {
//     res.send([{ name: 'Eda' },
//     { name: 'Edaan' }])
// })

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 -Sayfa Bulunamadı",
        name: "Eda",
        errorMessage: "Aradığınız sayfa bulunamadı."
    })
})

app.listen(3000, () => {
    console.log('Sunucu 3000 portunu dinliyor.');
})