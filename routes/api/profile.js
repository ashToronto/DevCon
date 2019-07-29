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
      return res.status(400).json({ msg: 'no profile for this user' })
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

  // Build profile object
  const profileFields = {}
  profileFields.user = req.user.id
  if (company) profileFields.company                   = company
  if (website) profileFields.website                   = website
  if (location) profileFields.location                 = location
  if (bio) profileFields.bio                           = bio
  if (status) profileFields.status                     = status
  if (githubUserName) profileFields.githubUserName     = company

  if (skills) profileFields.skills                     = skills.split(', ').map(skill => skill.trim())
  // console.log(profileFields.skills)
  // res.send('Worked')

  profileFields.social = {}
  if (youtube) profileFields.social.youtube            = youtube
  if (linkedIn) profileFields.social.linkedIn          = linkedIn
  if (instagram) profileFields.social.instagram        = instagram
  if (twitter) profileFields.social.twitter            = twitter

  // Insert object
  try {
    let profile = await Profile.findOne({ user: req.user.id })

      //update profile variable
      if (profile){
        profile = await Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields },
          {new: true}
        )
        return res.json(profile)
      }

      // create a new profile
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
});

// @route   GET api/profile
// @route   GET api/profile will display all profiles without auth
// @access  Public
router.get('/', async (req, res) => {
  const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    if (!profiles){
      return res.status(400).json({ msg: 'no profiles exist' })
    }

    try {
      res.json(profiles)
    } catch(err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
})

// @route   GET api/profile/user/:user_id
// @route   GET api/profile will display single profile of specific user
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    if (!profile){
      return res.status(400).json({ msg: 'no profile found' })
    }

    try {
      res.json(profile)
    } catch(err) {
      console.error(err.message)
      res.status(500).send('Server error, profile may not exist')
    }
})

// @route   GET api/profile/delete
// @route   GET api/profile will delete user and profile
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id }) // remove profile
      await User.findOneAndRemove({ _id: req.user.id })     // remove User
      res.json({msg: 'user deleted'})
    } catch(err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
})


module.exports = router
