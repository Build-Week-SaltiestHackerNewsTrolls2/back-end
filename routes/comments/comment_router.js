const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
		const requestOptions = {
			headers: { accept: 'application/json' },
		}
   
	axios
		.get(`https://salty-flask-app.herokuapp.com/users`, requestOptions)
		.then((response) => {
			res.status(200).json(response.data)
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

router.get('/user_comments/:name', (req, res) => {
	const requestOptions = {
		headers: { accept: 'application/json' },
	}
   const {name} = req.params
	axios
		.get(`https://salty-flask-app.herokuapp.com/comment/${name}`, requestOptions)
		.then((response) => {
			res.status(200).json(response.data)
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})


https: module.exports = router
