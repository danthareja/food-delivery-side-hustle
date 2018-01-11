const { send, json } = require('micro')
const mongoose = require('mongoose')
const db = require('../db')

module.exports.create = async (req, res) => {
  const { name, location, phone } = await json(req)

  try {
    await db.models.User.create({ name, location, phone })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return send(res, 422, {
        errors: Object.keys(err.errors).reduce((errors, key) => {
          errors[key] = err.errors[key].message
          return errors
        }, {})
      })
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return send(res, 422, {
        errors: {
          phone: 'number already registered'
        }
      })
    }
    return send(res, 422, {
      errors: {
        server: err.message
      }
    })
  }
  return {
    errors: null
  }
}