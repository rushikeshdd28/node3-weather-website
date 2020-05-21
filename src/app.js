const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

console.log(publicDirectoryPath)
//setup handlebar and view location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Rushi '
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Rushi '
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        help: 'Help Message to access weather app',
        title: 'Help Page',
        name: 'Rushi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    console.log(req.query)
    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send ({ error })
        }
        
        //console.log(data)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send ({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            console.log('data = '+forecastData+' at '+location)
        })
        
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term '
        })
    }
    console.log(req.query)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page',{
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Rushi'
    })
})


app.get('*', (req, res) => {
    res.render('404page',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Rushi'
    })
})
app.listen(3000, () => {
    console.log('Express server listen at port 3000')
})