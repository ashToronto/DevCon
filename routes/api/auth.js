const express     = require('express')
const router      = express.Router()
const auth        = require('../../middleware/auth')
const users       = require('../../models/User')
const bcrypt      = require('bcryptjs')
const jwt         = require('jsonwebtoken')
const config      = require('config')

const { check, validationResult } = require('express-validator')


// @route   GET api/auth
// @access  Public (no web token needed)
// returns profile excluding password
router.post('/', [
  check('email', 'please input a valid email').isEmail(),
  check('password', 'password is required').exists()
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    // check if user exists
    let user = await User.findOne({ email })

    if(!user){
      res.status(400).json({errors: [{msg: 'incoreect login credentials'}]})
    }

    //Match encoded token password with user input password
    const doesMatch = await bcrypt.compare(password, user.password)
    if (!doesMatch){
      res.status(400).json({errors: [{msg: 'incoreect login credentials'}]})
    }

    // return json web token
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtToken'),
      { expiresIn: 36000 }, // seconds
      (err, token) => {
        if(err) throw err
        res.json({ token })
      }
    )

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
});



module.exports = router
