const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Defines path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

const app = express();
const port = process.env.PORT || 3000;

// Sets hbs view engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Sets path for static views directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Itay Tur'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Itay Tur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'Itay Tur'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address;
    if( !address ) {
        return res.send({error: 'error: address must be specified'});
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help not found',
        message: 'help article not found',
        name: 'Itay Tur'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Page not found',
        message: 'This page was not found',
        name: 'Itay Tur'
    })
})

app.listen(port, () => {
    console.log('server up and running on port ' + port)
})