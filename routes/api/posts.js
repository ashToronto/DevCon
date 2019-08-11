const express                           = require('express')
const router                            = express.Router()
const auth                              = require('../../middleware/auth')

const Post                              = require('../../models/Posts')
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
    check('text','Text is required').not().isEmpty()
  ]
],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({})
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })

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


  // @route   Delete api/posts/:id
  // @desc    Delete a post
  // @access  Private
  router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if (!post){
        return res.status(404).json({msg: 'Post not found' })
      }
      await post.remove();
      res.json({ msg: 'Post deleted' });
    } catch {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  });

module.exports = router
