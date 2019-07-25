const express                           = require('express')
const router                            = express.Router()
const auth                              = require('../../middleware/auth')

const Profile                           = require('../../models/profile')
const User                              = require('../../models/User')
const { check, validationResult }       = require('express-validator')

// @route   GET api/profile will get all user profiles
// @route   GET api/profile/me will get my profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {

      const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar'])

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

// @route   Post api/profile
// @route   Post api/profile will create my profile
// @access  Private
router.post('/', [auth,
  [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
  ]
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  // Get Profile model properties
  const {
    company,
    website,
    location,
    bio,
    status,
    githubUserName,
    skills,
    youtube,
    twitter,
    linkedIn,
    instagram
  } = req.body

  // Build profile object to be inserted
  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company                   = company
  if (website) profileFields.website                   = website
  if (location) profileFields.location                 = location
  if (bio) profileFields.bio                           = bio
  if (status) profileFields.status                     = status
  if (githubUserName) profileFields.githubUserName     = company

  if (skills) profileFields.skills                     = skills.split(',').map(skill => skill.trim())
  // console.log(profileFields.skills)
  // res.send('Worked')

  profileFields.social = {}
  if (youtube) profileFields.social.youtube            = youtube
  if (linkedIn) profileFields.social.linkedIn          = linkedIn
  if (instagram) profileFields.social.instagram        = instagram
  if (twitter) profileFields.social.twitter            = twitter

  // Insert object
  try {
    let Profile = await Profile.findOne({ user: req.user.id }
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

});


module.exports = router
