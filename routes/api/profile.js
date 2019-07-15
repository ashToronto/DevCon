const express   = require('express')
const router    = express.Router()

// @route   GET api/profile
// @access  Public (no web token needed)
router.get('/', (req, res) => res.send('Profile Routes'))

module.exports = router
