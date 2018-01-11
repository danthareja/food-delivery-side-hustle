const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports.models = require('./models')
module.exports.connect = (url = process.env.MONGODB_URI) =>
  mongoose.connect(url, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  })
module.exports.disconnect = () => mongoose.disconnect()
