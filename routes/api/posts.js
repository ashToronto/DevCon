const express                           = require('express')
const router                            = express.Router()
const auth                              = require('../../middleware/auth')

const Post                              = require('../../models/posts')
const User                              = require('../../models/User')
const Profile                           = require('../../models/profile')
const { check, validationResult }       = require('express-validator')
const request                           = require('request')
const config                            = require('config')

// @route   GET api/posts
// @access  Public (no web token needed)
router.post('/', [auth,
  [
    check('text','Text is required')
    .not()
    .isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({})
    }
    const user = await Post.findById({req.user.id}).populate('user', ['name', 'avatar'])

    try {

    } catch(err){
      console.error(err.message)
      res.status(500).send('Server error')
    }

    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.body.id
    }



  })

module.exports = router
