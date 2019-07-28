const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicPath))

// route index, /help, dan /about tidak perlu dibuat karena ud pakai express static file. 

// app.com
// app.get('', (req, res) => {
//   res.send({title: 'Hello Express'})
// })

// app.com/help
// app.get('/help', (req, res) => {
//   res.send({title: 'Help'})
// })

// app.com/about
// app.get('/about', (req, res) => {
//   res.send({title: 'About'})
// })

// render the hbs views using handlebars template(view) engine
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ardian Tirta',
    location: 'Jakarta'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ardian Tirta',
    location: 'Jakarta'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Ask us anything.',
    name: 'Ardian Tirta'
  })
})

// app.com/weather
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errMsg: 'Help article not found',
    name: 'Ardian Tirta'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errMsg: 'Page not found',
    name: 'Ardian Tirta'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
