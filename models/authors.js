const mongoose = require('mongoose');
// const { Schema } = mongoose;

const authorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	dateJoin: {
		type: Date,
		default: Date.now
	}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;


