const request = require("request")

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4e4a08e4e8089bbdf788793cfb6d1d49&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'



    request({url, json:true}, (error, {body })=>{
            if(error){
                callback('Unable to connect to network', undefined)
            }else if(body.error){
                callback('Location doesnt exist.', undefined)
            }else{
                
                callback(undefined, 'We are in ' + body.location.name + '. Weather is ' + body.current.weather_descriptions[0] + '. Current temp is ' + body.current.temperature + ' but it feels like ' + body.current.feelslike + ' .  Local date/time is ' + body.location.localtime + '. And timezone is ' + body.loaction.timezone_id + '.')
            }
    })


}

module.exports = forecast

