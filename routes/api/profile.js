const express   = require('express')
const router    = express.Router()
const auth      = require('../../middleware/auth')

const Profile   = require('../../models/profile')
const User      = require('../../models/User')

// @route   GET api/profile will get all user profiles
// @route   GET api/profile/me will get my profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {

    const profile = await mongoose.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])

    if (!profile) {
      res.status(400).json({ msg: 'no profile for this user' })
    }
    //else
    res.json(profile)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('server error')
  }
});

module.exports = router
