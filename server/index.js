require('dotenv').config()

const { router, post } = require('microrouter')

const db = require('./db');
const { twilio, numbers } = require('./controllers')

db.connect();

module.exports = router(
  post('/twilio/send', twilio.send),
  post('/twilio/receive', twilio.receive),
  post('/api/numbers', numbers.create)
)