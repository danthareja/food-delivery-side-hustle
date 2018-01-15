module.exports.validateAPIKey = async (req, res, next) => {
  const secret = req.headers['x-api-key'];

  console.log(secret, process.env.API_KEY)
  if (!secret) {
    return res.status(401).json({
      error: 'Missing X-API-Key header'
    })
  }

  if (secret !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Invalid X-API-Key header'
    })
  }
  
  next()
}