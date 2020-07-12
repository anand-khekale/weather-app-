const request = require('request')

const forecast = (lattitude, longitude, callback)=>{
//Get weather from weatherstack for the Lattitude/Longitude passed.

//const url = 'http://api.weatherstack.com/current?access_key=b2c57a9741b8de0d0d38e10f3bd69a03&query=37.8267,-122.4233'
const url = 'http://api.weatherstack.com/current?access_key=b2c57a9741b8de0d0d38e10f3bd69a03&query='+ encodeURIComponent(lattitude)+ ',' + encodeURIComponent(longitude)

request({ url, json: true}, (error, { body })=>{

    if (error) {
        callback('Unable to get weather information', undefined)
    } else if(body.error) {
        callback('Location not valid', undefined)
    } else callback(undefined, 
        data = `Currently ${body.current.weather_descriptions[0]}. Temperature is ${body.current.temperature} °C and it feels like ${body.current.feelslike} °C.`
    )
  })
}
module.exports= forecast