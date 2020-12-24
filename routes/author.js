const express = require('express');
const router = express.Router();



// our models
const Author = require('../models/authors')


router
	.get('/', async (req, res) => {
		// const mu = await Author.find();
		// res.json(mu)
		res.render('authors/index', {title: "Authors", authors: await Author.find({}) })
	});

router
	.get('/new', (req, res) => {
		res.render('authors/newauthorform', {title : 'New Authors'})
	})
	.post('/new', async (req, res) => {
		// res.send(req.body.email)
		const author = new Author ({
			name: req.body.name,
			email: req.body.email
		});

		try {
			const newAuthor = await author.save()
			res.redirect('/authors')
		} catch {
			res.render('/authors/new', 
			{
				author: author.name,
				errMessage: "Failed to create new author"
			})
		}


		
	});





module.exports = router;