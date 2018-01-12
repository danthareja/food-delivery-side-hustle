const Twilio = require('twilio')
const db = require('../db')

const twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

module.exports.receive = async (req, res) => {
  const twiml = new Twilio.twiml.MessagingResponse()
  twiml.message('The Robots are coming! Head for the hills!')
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(twiml.toString())
}

module.exports.send = async (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(422).json({
      error: 'Invalid message'
    })
  }

  const users = await db.models.User
    .find()
    .lean(true)
    .exec()

  await Promise.all(users.map(user => {
    return twilio.messages.create({
      body: message,
      to: user.phone,
      from: process.env.TWILIO_PHONE_NUMBER
    })
  }))

  res.json({ error: null })
}