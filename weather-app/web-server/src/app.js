const express = require('express')
const path = require('path')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()

app.set('view engine', 'hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const viewsPath = path.join(__dirname, '../public/views')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hava Durumu Uygulaması',
        name: 'Can'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hakkımızda',
        name: 'Can'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Yardım sayfası',
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
    res.send({
        forecast: 'Hava sıcaklığı',
        geocode: 'Bursa'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{ name: 'Can' },
//     { name: 'Canan' }])
// })

app.listen(3000, () => {
    console.log('Sunucu 300 portunu dinliyor.');
})