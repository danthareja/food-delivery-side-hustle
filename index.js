require('dotenv').config()

const app = require('./app')
const db = require('./db')

const PORT = process.env.PORT || 3000

db.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`))
  .catch(e => {
    console.error(
      `Fatal error connecting to MongoDB at ${process.env.MONGODB_URI}`
    )
    console.error(e)
    process.exit(1)
  })
  .then(() => new Promise((resolve, reject) => {
    app.listen(PORT, resolve)
  }))
  .then(() => console.log(`🌎 listening on port ${PORT}`))
