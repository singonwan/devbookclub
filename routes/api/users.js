const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

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
    async (req, res) => {
        // console.log(req.body);   { name: 'RH', email: 'rh@gwan.com', password: '123456' }
        // check errors from the checks
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //check if user exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }] //making it similar to validationresults errors res
                });
            }
            //get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            //create new instance of user
            user = new User({
                name,
                email,
                avatar,
                password
            });

            //encrypt password using bcrypt - passwords are hashed to protect against attackers who gain read-only access to db
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            //save user     - update document with mongoose function save()
            await user.save();

            //return jwt

            res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
