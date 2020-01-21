const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0377b08450c2b947954bcb544c21ab7e/${latitude},${longitude}`

    request({ url, json: true }, (error, {body: responseBody} = {}) => {
        if (error) {
            callback('Unable to connect!');
        } else if (responseBody.error) {
            callback('Unable to find location!')
        } else {
            callback(undefined, responseBody.daily.data[0].summary + ' It is currently ' + responseBody.currently.temperature + ' degress out. There is a ' + responseBody.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;