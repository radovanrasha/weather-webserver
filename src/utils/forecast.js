const request = require("request")

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=79dd291261538ef8acfff065f343113e&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'



    request({url, json:true}, (error, {body })=>{
            if(error){
                callback('Unable to connect to network', undefined)
            }else if(body.error){
                callback('Location doesnt exist.', undefined)
            }else{
                
                callback(undefined, 'We are in ' + body.location.name + '. Weather is ' + body.current.weather_descriptions[0] + '. Current temp is ' + body.current.temperature + ' but it feels like ' + body.current.feelslike + ' . Time zone of this city is ' + body.location.timezone_id + '. And local date/time is ' + body.location.localtime)
            }
    })


}

module.exports = forecast

