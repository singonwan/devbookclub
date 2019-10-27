const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/users
// @desc    Register User
// @access  Public(no tokens needed)
router.post(
    '/',
    [
        check('name', 'Name is Required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    (req, res) => {
        // console.log(req.body);   { name: 'RH', email: 'rh@gwan.com', password: '123456' }
        // check errors from the checks
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send('User route');
    }
);

module.exports = router;
