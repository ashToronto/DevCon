const express     = require('express')
const router      = express.Router()
const { check, validationResult } = require('express-validator/check')

// @route   POST api/users
// @access  Public (no web token needed)
router.post('/', [
  check('name', 'name is required').not.isEmpty(),
  check('email', 'please input a valid email').isEmail(),
  check('password', 'password must have at least 6 characters').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  res.send('User Routes')
})

module.exports = router
