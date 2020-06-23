const express = require('express')
const router = express.Router()
const Comments = require('./saved_model')






router.get('/:id', (req, res) => {
	const { id } = req.params
	Comments.getById(id)
		.then((comment) => {
			res.status(200).json(comment)
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})


router.post('/', (req, res) => {
	Comments.add(req.body)
		.then((comment) => {
			res.status(201).json({ message: 'A New Issue was Discovered', comment })
		})
		.catch((error) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})


router.delete('/:id', (req, res) => {
	const { id } = req.params
	Comments.getById(id)
		.then((comment) => {
			comment
				? Comments.erase(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `Comment ${id} was deleted!`, info: comment }) : null
				  })
				: null
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

module.exports = router
