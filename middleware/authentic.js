const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
	// console.log(req.headers.authorization)
	const authorization = req.headers.authorization;
	const token = authorization.split(' ')[1]
	if(token){
		jwt.verify(token, process.env.JWT_KEY, (err, token) => {
			if(err){
				res.status(500).json({
					message: 'some error is ocure'
				})
			}
			if(token){
				res.status(200).json({
					message: " token is valid"
				})
			}
		})
	}
	next();
}


module.exports = checkToken;