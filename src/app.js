const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static derecotry to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Charis Anagnostopoulos'  
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Charis Anagnostopoulos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a weather web application',
        name: 'Charis Anagnostopoulos'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) =>{
      
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
       
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            // res.render(
            //     'index', {
            //         title: 'Current Weather',
            //         forecast: forecastData,
            //         location: location,
            //         address: req.query.address
            //     }
            // )
        })
    }) 
  
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    } 
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Charis Anagnostopoulos',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Charis Anagnostopoulos',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})