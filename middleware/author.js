const jwt = require('jsonwebtoken');


function authAuthor(req, res, next) {
	// console.log("request dot userDAta: ",req.userData);
	console.log(req.headers.authorization)
	const decode = jwt.verify(req.body.token, process.env.JWT_KEY)
	// console.log(decode)
	jwt.verify(req.body.token, process.env.JWT_KEY, (err, decode) => {
		// console.log('this error = ', err)
		// console.log('this decode = ',decode)
		if (err) {
			console.log('some error is ocure=============')
		}
		if(decode){
			console.log('decodeing=====================')
		}
	})
	next();	
}

module.exports = authAuthor;