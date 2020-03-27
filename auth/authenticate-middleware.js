const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		res.status(400).json({ message: 'You must log in first to view this resource.' });
	} else {
		jwt.verify(authorization, jwtSecret, (error, decodedToken) => {
			if (error) {
				res.status(403).json({ message: 'Invalid credentials.' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	}
};
