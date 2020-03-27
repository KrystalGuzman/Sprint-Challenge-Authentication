const router = require('express').Router();
const bcrypt = require('bcryptjs');

const checkUsernameAndPasswordEntered = require('./checkUserNameAndPasswordEntered');
const checkUsernameUnique = require('./checkUsernameUnique');
const generateToken = require('./generateToken');
const database = require('./auth-model');

router.post('/register', checkUsernameAndPasswordEntered, checkUsernameUnique, (req, res) => {
	// encrypt user password
	let passwordHash = bcrypt.hashSync(req.body.password, 14);
	req.body.password = passwordHash;

	database
		.addUser(req.body)
		.then((addedUser) => {
			const token = generateToken(req.body);

			res.status(201).json({ message: 'Created account for ' + req.body.username, token });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Could not add user', error });
		});
});

router.post('/login', checkUsernameAndPasswordEntered, (req, res) => {
	database
		.getUserBy({ username: req.body.username })
		.then((userFound) => {
			// verify that the user exists and the password is correct.
			if (userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
				const token = generateToken(req.body);

				res.status(200).json({ message: 'Logged in ' + req.body.username + '.', token });
			} else {
				// username and/or password are incorrect
				res.status(401).json({ message: 'Invalid Credentials.' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'server error in retrieving username upon login', error });
		});
});

module.exports = router;
