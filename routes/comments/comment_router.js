const axios = require('axios')
const express = require('express')
const router = express.Router()

router.get('/topfive', (req, res) => {
	const requestOptions = {
		headers: { accept: 'application/json' },
	}

	axios
		.get('https://salty-flask-app.herokuapp.com/topfive ', requestOptions)
		.then((response) => {
			res.status(200).json(response.data)
			response.data.insert('./db/temp.db3')
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

router.get('/saltyscore/:name', (req, res) => {
	const requestOptions = {
		headers: { accept: 'application/json' },
	}
   const {name} = req.params
	axios
		.get(`https://salty-flask-app.herokuapp.com/saltyscore/${name}`, requestOptions)
		.then((response) => {
			res.status(200).json(response.data)
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

module.exports = router
