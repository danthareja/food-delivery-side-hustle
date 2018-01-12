const mongoose = require('mongoose')
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'is required']
  },
  location: {
    type: String,
    required: [true, 'is required']
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'is required'],
    validate: {
      validator: function(value) {
        const number = phoneUtil.parseAndKeepRawInput(value, 'US')
        return phoneUtil.isValidNumber(number)
      },
      message: '{VALUE} is not a valid phone number'
    },
  }
})

schema.pre('save', function(next) {
  const number = phoneUtil.parseAndKeepRawInput(this.phone, 'US')
  this.phone = phoneUtil.format(number, PNF.E164)
  return next()
})

module.exports = mongoose.model('User', schema)
