const express = require('express')
const router = express.Router()
const Users = require('./user_model')
const mw = require('../custom/middleware')
const validUserId = mw.validUserId
const bcryptjs = require('bcryptjs')



router.get('/', (req, res) => {
	Users.get()
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

router.get('/:id/favorites', validUserId, (req, res) => {
	const { id } = req.params

	Users.getUserFavs(id)
		.then((data) => {
			data ? res.status(200).json(data) : null
		})
		.catch((err) => {
			res.status(500).json({ error: 'You found me but I cannot provide any info, try again!', err })
		})
})


router.get('/:id', validUserId, (req, res) => {
	const { id } = req.params
	Users.getById(id)
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})
router.put('/:id', validUserId, (req, res) => {
	const { id } = req.params
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
	Users.update(id, userObject)
		.then(user => {
			res.status(200).json({ success: 'Info Updated!', info: userObject })
		})
		.catch(err => {
			res.status(500).json({ error: 'You were unable to get info from the database!'})
		})
})

router.delete('/:id', validUserId, (req, res) => {
	const { id } = req.params
	Users.getById(id)
		.then(user => {
			user
				? Users.erase(id).then(deleted => {
						deleted ? res.status(200).json({ success: `User ${id} was deleted!`, info: user }) : null
				})
				: null
		})
		.catch(err => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})


module.exports = router
