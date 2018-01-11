const { send, json } = require('micro')
const db = require('../db')

module.exports.create = async (req, res) => {
  const { value } = await json(req)

  try {
    await db.models.PhoneNumber.create({ value })
  } catch (e) {
    return send(res, 422, {
      error: e.message
    })
  }

  return {
    error: null
  }
}