const express = require('express')
const router = express.Router()

// @route   POST api/users
// @access  Public (no web token needed)
router.post('/', (req, res) => {
  console.log(req.body)
  res.send('User Routes')
})

module.exports = router
