const express = require('express');
const router = express.Router();

// @route   Get api/profile
// @desc    Test route
// @access  Public(no tokens needed)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
