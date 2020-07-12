const request = require('request')

const getGeocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXBraGVrYWxlIiwiYSI6ImNrY2FoajExNTFzeHYyc3Fwajg2ZmF1b2kifQ.YSNiJ5LvG3wDMYQvyQepwA&limit=1'
    request({ url, json: true}, (error, { body })=>{
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        
        }
    })
}
module.exports= getGeocode