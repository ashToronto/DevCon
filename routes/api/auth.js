const express   = require('express')
const router    = express.Router()
const auth      = require('../../middleware/auth')
const users     = require('../../models/User')

// @route   GET api/auth
// @access  Public (no web token needed)
// returns profile excluding password
router.get('/', auth, async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch(err) {
    res.status(500).json({msg: 'server error could not get profile details'})
  }
})

module.exports = router
