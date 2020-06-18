const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { jwtSecret } = require('./config/secret')
const Users = require('../user/user_model')

const generateToken = (user) => {
	const payload = {
		username: user.username,
	}

	const options = {
		expiresIn: '1h',
	}
	return jwt.sign(payload, jwtSecret, options)
}

router.post('/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcryptjs.hashSync(password, rounds)
  
  const userObject = {
    email: email,
    password: hash,
    firstName: firstName,
    lastName: lastName,
  }
  
  
  if (userObject) {
		Users.add(userObject)
			.then((user) => {
        const token = genToken(userObject)
				res.status(201).json({ newUser: userObject, token: token })
			})
			.catch((error) => {
				res.status(500).json({ message: "The problem is not on your end." })
			})
	} else {
		res.status(400).json({
			message: 'please provide username and password',
		})
	}
})

router.post('/login', (req, res) => {
	const { username, password } = req.body

	if (req.body) {
		Users.findBy({ username: username })
			.then(([user]) => {
				// compare the password the hash stored in the database
				if (user && bcryptjs.compareSync(password, user.password)) {
					const token = generateToken(user)
					res.status(200).json({ message: 'Welcome to our API', token })
				} else {
					res.status(401).json({ message: 'Invalid credentials' })
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message })
			})
	} else {
		res.status(400).json({
			message: 'please provide username and password and the password should be alphanumeric',
		})
	}
})

module.exports = router
