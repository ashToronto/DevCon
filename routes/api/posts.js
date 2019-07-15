const express   = require('express')
const router    = express.Router()

// @route   GET api/posts
// @access  Public (no web token needed)
router.get('/', (req, res) => res.send('Form posts Routes'))

module.exports = router
