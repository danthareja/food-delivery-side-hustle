require('dotenv').config()

const { router, post, options } = require('microrouter')
const cors = require('micro-cors')()

const { twilio, numbers } = require('./controllers')
const db = require('./db');

db
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`))
  .catch(e => {
    console.error(
      `Fatal error connecting to MongoDB at ${process.env.MONGODB_URI}`
    );
    console.error(e);
    process.exit(1);
  });

module.exports = router(
  options('/twilio/send', cors()),
  post('/twilio/send', cors(twilio.send)),
  options('/twilio/receive', cors()),
  post('/twilio/receive', cors(twilio.receive)),
  options('/api/numbers', cors()),
  post('/api/numbers', cors(numbers.create)),
)