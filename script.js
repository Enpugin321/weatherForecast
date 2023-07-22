const express = require('express')
const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather.request')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null})
})

app.post('/', async (req, res) => {
    const { city } = req.body

    // weatherRequest(city)
    
    const {weather, error} = await weatherRequest(city)
    console.log('Weather', weather)
    console.log('Error', error)

     

    res.render('index', {weather, error})
})

app.listen(3000, () => {
   console.log('SERVER HAS STARTED ON PORT 3000...')
})

