const mongoose = require('mongoose')
const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const schema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
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
  const number = phoneUtil.parseAndKeepRawInput(this.value, 'US')
  this.value = phoneUtil.format(number, PNF.E164)
  return next()
})

module.exports = mongoose.model('PhoneNumber', schema)
