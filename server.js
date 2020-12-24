if (process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
	// const dotenv = require('dotenv')
	// dotenv.load()
}

// import our package
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');



// our local package
const indexRoutes = require('./routes/index');




// instancing our package
const app = express();


	// setting our server
// setting body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// public folder
app.use(express.static('public'));

// template engine & layout
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);





// setting our routes
app.use(indexRoutes);






// setting our database
mongoose.connect( process.env.DATABASE_URL, {
	useNewUrlParser: true
	// useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to mongodb with mongoose'));



// setting our port
// app.listen(process.env.PORT || 3000 );
const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
	console.log(`Your server is running in port :  ${PORT}`)
});

