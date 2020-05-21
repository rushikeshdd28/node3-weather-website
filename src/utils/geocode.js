const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoicnVzaGlrZXNoZGQyOCIsImEiOiJja2E2bGx1bzMwNnc3MnRueDl5ejBxMWc1In0.01gtysJZFx7sv75BvgV1LA'
    //console.log(geocodeURL)
    request({url, json:true},(error, {body}) => {
    
        if(error){
            callback('Can not access the map API!', undefined)
        }else if(body.message){
            callback('No location Provided', undefined)
        }else if(body.features.length === 0){
            callback('Invalid location, Please search again', undefined)
        }else{
            callback(undefined,  {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
