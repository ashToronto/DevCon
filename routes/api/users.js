const express                     = require('express')
const router                      = express.Router()
const gravatar                    = require('gravatar')
const bcrypt                      = require('bcryptjs')
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')
// @route   POST api/users
// @access  Public (no web token needed)
router.post('/', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'please input a valid email').isEmail(),
  check('password', 'password must have at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    // check if user exists
    let user = await User.findOne({ email })

    if(user){
      res.status(400).json({ errors: [{ msg: 'User already exists' }]})
    }

    // Get user gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    user = new User({
      name,
      email,
      avatar,
      password
    })

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    // save user
    await user.save()

    // return json web token

  res.send('User registered')

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
});


module.exports = router
