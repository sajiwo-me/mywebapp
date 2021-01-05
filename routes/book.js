const express = require('express');
const router = express.Router();
const Book = require('../models/book')



//our middleware
const checkToken = require('../middleware/authentic') 




router
	.get('/', checkToken, async (req, res) => {
		// res.send('all books');
		res.render('book/index', {title: 'Books', books : await Book.find({})});
	})
	.get('/new', (req, res) => {
		// res.send('new books');
		res.render('book/newbook', {title: 'New Book'})
	})
	.post('/new', async (req, res) => {
		// res.send(req.body);
		const newbook = new Book({
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre
		});

		try {
			await newbook.save()
			res.redirect('/books');
		} catch {
			res.render('/books/new', {errorMessage: "gagal"})
		}

	});


module.exports = router;