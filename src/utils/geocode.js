const request = require('request')

const geocode = (address, callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=8c3f758721045199038bef7b3b2df568&query=' + encodeURIComponent(address) +'&limit=1'

    request({ url: url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.data.length === 0){
            callback('Location doesnt exist.', undefined)
        }else{
            const data = {
                location: body.data[0].name,
                country: body.data[0].country,
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            }
            callback(undefined, data)
        }
    })

    
}

// geocode('beograd', (error, data) => {
//         console.log('Error is ', error)
//         console.log('Data is ', data)
// })

module.exports = geocode