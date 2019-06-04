const express = require('express');
const expressApp = express();
const geocode = require('../utils/gecode');
const forecast = require('../utils/forecast');

module.exports = (app = expressApp) => {


    app.get('', (request, response) => {
        response.render('pages/index', {
            title: 'Handleme',
        });
    });
    app.get('/about', (request, response) => {
        response.render('pages/about', {
            title: 'About',
            name: 'Mohammad',
            image: 'about.png',
        });
    });



    app.get('/weather', (request, response) => {
        response.render('pages/weather', {
            title: 'weather'
        });
    });


    app.get('/api/weather', (request, response) => {
        if (!request.query.address) {
            return response.status(400).send({
                title: 'Weather',
                error: 'Error, an address must be provided',
            });
        }
        geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return response.status(400).send({
                    title: 'Weather', error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return response.status(400).send({
                        title: 'Weather',
                        error
                    })
                }
                response.send({
                    forecast: forecastData,
                    location,
                    address: request.query.address,
                    products: [{ name: 'product1', price: 500 }, { name: 'product2', price: 2350 }]
                })
            })
        })
    });



    app.all('*', (request, response) => {
        response.status(404).send('Page not found!');
    });

}
