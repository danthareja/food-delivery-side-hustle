const { send } = require('micro')
const parse = require('urlencoded-body-parser')
const db = require('../db')

module.exports.create = async (req, res) => {
  const { value } = await parse(req)

  try {
    await db.models.PhoneNumber.create({ value })
  } catch (e) {
    console.error(e)
    return send(res, 422, {
      error: e.message
    })
  }

  return {
    error: null
  }
}