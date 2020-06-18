const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const server = express()

server.use(helmet(), morgan('dev'), express.json(), cors())


server.get('/', (req, res) => {
	res.status(200).json({ Message: 'Welcome SaltiestHackerNewsTrolls2 API' })
})
module.exports = server
