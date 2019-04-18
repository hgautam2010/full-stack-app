const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Users
const Users = require('../../models/Users');

// @route	POST /api/users/register
// @desc	Register new user
// @access	Public
router.post('/register', (req, res) => {
	Users.findOne({email: req.body.email})
		.then(user => {
			if(user)
			{
				return res.status(400).json({email: 'Email already exist.'});
			} else {
				const newUser = new Users({
					email: req.body.email,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then(user => res.status(200).json(user))
							.catch(err => console.log(err));
					})
				});
			}
		})
		.catch()
});

// @route	POST /api/users/login
// @desc	Login user
// @access	Public
router.post('/login', (req,res) => {
	const email = req.body.email;
	const password = req.body.password;

	Users.findOne({email: email})
		.then(user => {
			if(!user) {
				return res.status(404).json({email: 'User not found.'});
			} else {
				bcrypt.compare(password, user.password)
					.then(isMatch => {
						if(!isMatch) {
							return res.status(404).json({password: 'Incorrect pasword.'});
						} else {
							const payload = {email: user.email, id: user._id};
							jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
								res.json({
									success: true,
									token: 'Bearer '+token
								});
							});
						}
					})
					.catch(err => console.log(err));
			}
		})
})

// @route	POST /api/users/get
// @desc	Login user
// @access	Private
router.post('/get', passport.authenticate('jwt', { session: false }), (req, res) => {
	Users.findById(req.body.id,{_id: 1, email: 1})
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => console.log(err));
});

module.exports = router;