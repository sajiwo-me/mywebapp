const express = require('express');
const router = express.Router();



// our models
const Author = require('../models/authors');


// our middleware
const authAuthor = require('../middleware/author')


router
	.get('/', authAuthor, async (req, res, next) => {
		const mu = await Author.find();
		// res.json(mu)
		// res.render('authors/index', {title: "Authors", authors: await Author.find({})})
		// res.send('authors page')
		// console.log(req.originalUrl)
		// next()
		res.send(mu)
	
	})
	.get('/:authorId', authAuthor, async (req, res) => {
		// cara 1
		// Author.findById(req.params.authorId)
		// 	.exec()
		// 	.then( result => {
		// 		if (result != null) {
		// 			res.status(200).json(result)
		// 		}else{
		// 			res.status(500).json({
		// 				message: 'Author with the current Id is not found'
		// 			})
		// 		}
		// 	})
		// 	.catch( err => {
		// 		res.status(500).json({
		// 			error : err.message,
		// 		})
		// 	})

		// cara 2
		try{
			const auth = await Author.findById(req.params.authorId);
			if (auth){
				res.status(200).json(auth)
			}else{
				res.status(200).json({
					message: 'Author with the current Id is not found'
				})
			}

		}catch (err) {
			res.status(500).json({
				error: err,
			})
		}
	
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