const jwt       = require('jsonwebtoken')
const config    = require('config')

// Middleware function - access to req, res lifecycle
module.exports = function(req, res, next){
  // Get token from header
  const token = req.header('x-auth-token')

  //check for null token
  if (!token) {
    res.status(401).json({ msg: 'autherization denied, null value'})
  }

  //verify token, if valid decode else error
  try {
    const decode = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded.user
    next()
  } catch(err) {
    res.status(401).json({ msg: 'token is invalid' })
  }
}
