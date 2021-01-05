const express = require('express');
const router = express.Router();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// our models
const User = require('../models/users');

router
	.get('/signup', (req, res) => {
		// res.send('sign up page');
		res.render('auth/signup', {title: 'signpu'})
	})
	.post('/signup', async (req, res) => {
		// res.send(req.body);
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10)
		})
		try {
			await user.save()
			res.redirect('/user/signin');
		} catch (err) {
			res.render('/user/signup', {
				error : err
			})
		}
	})
	.get('/signin', (req, res) => {
		// res.send('sign in page');
		res.render('auth/signin', {title: 'Sign In'})
	})
	.post('/signin', (req, res) => {
		User.findOne({email: req.body.email})
			.exec()
			.then( user => {
				if (user){
					// console.log(user)
					bcrypt.compare(req.body.password, user.password, (err, result) => {
						if(err){
							console.log('errornya : ', err, 'resultnya : ', result)
							res.status(401).json({
								message: 'Authentication failed, Invalid email or password error'
							})
						}
						if(result){
							// console.log('errornya : ', err, 'resultnya : ', result)
							const token = jwt.sign(
								{
									email: user.email,
									userId: user._id
								},
								process.env.JWT_KEY,
								{
									expiresIn: "1h"
								}
							);

							res.status(200).send({
								message: 'Authentication successfully',
								token: token
							})
						}else {
							console.log('errornya : ', err, 'resultnya : ', result)
							res.status(401).json({
								message: 'Authentication failed, Invalid password'
							})
						}
					});
				}else{
					// console.log('errornya : ', err, 'resultnya : ', result)
					res.status(401).json({
						message: 'usernya kaga ada bg'
					})
				}
			})
			.catch( err => {
				res.status(500).json({
					error: err,
				})
			})


		// const user = await User.findOne({email: req.body.email})
		
		// if (await bcrypt.compare(req.body.password, user.password)) {
		// 	res.redirect('/authors')
		// } else {
		// 	res.render('/user/signin', {
		// 		errorMessage: 'email or password is not valid'
		// 	})
		// }

		// bcrypt.


	})


module.exports = router;