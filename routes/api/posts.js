const express                           = require('express')
const router                            = express.Router()
const auth                              = require('../../middleware/auth')

const Post                              = require('../../models/posts')
const User                              = require('../../models/User')
const Profile                           = require('../../models/profile')
const { check, validationResult }       = require('express-validator')
const request                           = require('request')
const config                            = require('config')

// @route   Post api/posts
// @desc    Create a user post
// @access  Private
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

    try {
      const user = await Post.findById({req.user.id}).populate('user', ['name', 'avatar'])

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.body.id
      }

      const post = await newPost.save()
      res.json(post)
    } catch(err){
      console.error(err.message)
      res.status(500).send('Server error')
    }
  });

  // @route   Get api/posts
  // @desc    Get all posts
  // @access  Private
  router.get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find({}).sort({ date: -1 })
      res.json(posts)
    } catch {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  });

module.exports = router
