const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   Get api/auth
// @desc    get authorized user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token aka login
// @access  Public(no tokens needed)
router.post(
    '/',
    [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // check errors from the checks
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //check if user exists
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid credentials' }]
                });
            }
            //compares plaintext password with encrypted password from user.
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid credentials' }] //keeping err msg the same for ambiguity. better security
                });
            }

            //return jwt - so that they can use the jwt to authenticate and access protected routes
            const payload = {
                user: {
                    id: user.id //id sent back by mongoose
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, //note: change back to 3600 in production
                (err, token) => {
                    if (err) throw err;
                    res.json({ token }); //else returns token
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
