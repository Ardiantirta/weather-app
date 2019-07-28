const request = require('request')

const forecast = (lat, lng, callback) => {
  let url = `https://api.darksky.net/forecast/e7193a0ef3cf18723c11aa9319edc830/${lat},${lng}?units=si`

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback(`unable to connect to darksky API`, undefined)
    } else if (body.error) {
      callback(`unable to find location`, undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
    }
  })
}

module.exports = forecast
