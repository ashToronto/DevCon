const express   = require('express')
const router    = express.Router()

// @route   GET api/users
// @access  Public (no web token needed)
router.get('/', (req, res) => res.send('User Routes'))

module.exports = router
