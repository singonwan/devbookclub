const express = require('express');
const router = express.Router();

// @route   Get api/users
// @desc    Test route
// @access  Public(no tokens needed)
router.get('/', (req, res) => res.send('User route'));

module.exports = router;
