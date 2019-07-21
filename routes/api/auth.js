const express   = require('express')
const router    = express.Router()
const auth      = require('../../middleware/auth')

// @route   GET api/auth
// @access  Public (no web token needed)
router.get('/', auth, (req, res) => res.send('Authentication Routes'))

module.exports = router
