const rp = require('request-promise')

module.exports = function(city) {
 if(!city) {
    return {
      weather: null,
      error: true
    }
 }

const KEY = '41ded6942ad3debd4c22dc150b0359ec'
const uri = `http://api.openweathermap.org/geo/1.0/direct`

const promise = new Promise (async function(resolve, reject) {
  const options = {
    uri: uri,
    qs: {
      q: city,
      appid: KEY,
      limit: 1,
    },
    json: true   
  }
  try {
    let response = await rp(options)
  let result = response[0]
  resolve(result)
  } catch (error) {
    return
  }
  
  
} )

 return promise.then(async function(result){
  console.log(result)
      const uriWeather = `https://api.openweathermap.org/data/2.5/weather`

      
       try {
        const weatherOptions = {
          uri: uriWeather,
          qs: {
            lat: result.lat,
            lon: result.lon,
            appid: KEY,
            units: 'metric'
          },
          json: true
         }
       let weatherData = await rp(weatherOptions)
       return{
        weather: `${result.name} : ${Math.round(weatherData.main.temp)}°`,
        error: null
      }
       
       } catch (error) {
        return{
          weather: null,
          error: true
        }
       }

  })

}