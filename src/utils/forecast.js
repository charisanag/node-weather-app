const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=3d803f82436a0c570084a9e5f1ecca8b&query=' + latitude  + ',' + longitude + '&units=m'
    //  const url = 'http://api.weatherstack.com/current?access_key=3d803f82436a0c570084a9e5f1ecca8b&query=-75.7088,44.1545&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
        callback(undefined,
             body.current.weather_descriptions[0] + '. It is current Temperature ' + body.current.temperature + ' celcius out. It feels like '+ 
             body.current.feelslike + ' celcius out. The humidity is ' + body.current.humidity + '%')
        // callback(undefined, response.body)
        }
    })
}


module.exports = forecast