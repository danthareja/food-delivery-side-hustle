const db = require('../db')

module.exports.create = async (req, res) => {
  const { name, location, phone } = req.body

  try {
    await db.models.User.create({ name, location, phone })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce((errors, key) => {
          errors[key] = err.errors[key].message
          return errors
        }, {})
      })
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(422).json({
        errors: {
          phone: 'number already registered'
        }
      })
    }
    return res.status(422).json({
      errors: {
        server: err.message
      }
    })
  }

  res.json({ errors: null })
}