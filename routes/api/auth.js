const express   = require('express')
const router    = express.Router()

// @route   GET api/auth
// @access  Public (no web token needed)
router.get('/', (req, res) => res.send('Authentication Routes'))

module.exports = router
