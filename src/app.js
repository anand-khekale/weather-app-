const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App",
        name: "Anand Khekale",
        footer: "Created by Anand"
    })
    })

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About me",
        name: "Anand Khekale"

    })
    })

app.get('/help', (req,res)=>{
    res.render('help', {
        title: "Help",
        name: 'Anand Khekale',
        message: "Help message"

    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    getGeocode(req.query.address, (error, {longitude, lattitude, location}={})=>{
        if (error){
            return res.send({ error })
        } else {
            forecast(lattitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData
                })
              })
        }
     })
    
    })

app.get('/help/*', (req, res)=>{
    res.render('notfound', {
       title: "404!",
       name: 'Anand Khekale',
       message: "Help page not found"
   
    })
    })

app.get('*',(req,res)=>{
    res.render('notfound', {
        title: "404!",
        name: 'Anand Khekale',
        message: "Page not found"
    
     })
    })

app.listen(port, ()=>{
    console.log('Server up on port '+ port)
}) 