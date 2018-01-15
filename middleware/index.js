module.exports.validateAPIKey = async (req, res, next) => {
  const key = req.headers['x-api-key'];

  if (!key) {
    return res.status(401).json({
      error: 'Missing X-API-Key header'
    })
  }

  if (key !== process.env.API_KEY) {
    return res.status(401).json({
      error: 'Invalid X-API-Key header'
    })
  }
  
  next()
}