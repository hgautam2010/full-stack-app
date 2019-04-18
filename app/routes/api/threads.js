const express = require('express');
const router = express.Router();
const Threads = require('../../models/Threads');
const passport = require('passport');
const Users = require('../../models/Users');

// @route	POST /api/threads/add
// @desc	Add Thread
// @access	Private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newThread = new Threads({
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags.split(','),
		user: req.user._id
	});
	newThread
		.save()
		.then(thread => res.status(200).json({thread}))
		.catch(err => console.log(err));
});

// @route	POST /api/users/query
// @desc	Query Threads
// @access	Private
router.post('/query', passport.authenticate('jwt', { session: false }), (req, res) => {
	const query = { $regex: '.*' + req.body.title + '.*' };
	Threads.find({title: query})
		.then(threads => {
			var ids = [];
			for(var i = 0; i < threads.length; i++)
				ids.push(threads[i].user);
			Users
            .find({_id: { $in: ids }}).lean()
            .then(users => {
				res.status(200).json({users: users, threads: threads})
			})
            .catch(err => console.log(err));
		})
		.catch(err => console.log(err));
});

module.exports = router;