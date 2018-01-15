const path = require('path')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const { twilio, users } = require('./controllers')
const { validateAPIKey } = require('./middleware')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.post('/twilio/send', validateAPIKey, twilio.send)
app.post('/twilio/receive', twilio.receive)
app.post('/api/users', users.create)

module.exports = app