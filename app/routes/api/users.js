const express = require('express');
const router = express.Router();

// @route	GET /api/threads/add
// @desc	Add new thread
// @access	Private
router.get('/add', (req, res) => res.status(200).json({msg: "Success"}));

module.exports = router;