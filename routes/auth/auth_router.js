const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const { jwtSecret } = require('./config/secret')
const newUser = require('./auth_model')

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
  const { email, password, country, firstName, lastName } = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcryptjs.hashSync(password, rounds)
  const userObject = {
    firstName: firstName,
		lastName: lastName,
		country: country,
		email: email,
    password: hash,
  }
  const token = generateToken(userObject)
  
  if (userObject) {
			newUser
				.add(userObject)
				.then((user) => {
					res.status(201).json({ newUser: userObject , token: token  })
				})
				.catch((error) => {
					res.status(500).json({ message: 'The problem is not on your end.' })
				})
		} else {
			res.status(400).json({
				message: 'please provide all required information',
			})
		}
})

router.post('/login', (req, res) => {
	const { email, password } = req.body

	if (req.body) {
		newUser.findBy({ email: email })
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
				res.status(500).json({ message: 'The problem is not on your end.' })
			})
	} else {
		res.status(400).json({
			message: 'please provide email and password',
		})
	}
})

module.exports = router
