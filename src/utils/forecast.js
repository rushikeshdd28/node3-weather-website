const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=33e5307afff537399c8e384d752b5687&query='+latitude+','+longitude
    console.log('forcastURL = '+url)
    request({url, json:true},(error, response) => {
    
        if(error){
            callback('Can not access the weathere data!', undefined)
        }else if(response.body.error){
            callback('Unable to find location!  ', undefined)
        }else{
            const data = response.body.current
            callback(undefined, data.weather_descriptions[0]+'. It is currently '+data.temperature+' degrees out. It feels like '+data.feelslike+' degrees out')
        }
    })
}

module.exports = forecast
