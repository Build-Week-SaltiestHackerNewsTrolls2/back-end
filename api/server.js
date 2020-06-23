const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const auth = require('../routes/auth/restricted-middleware')
const authRouter = require('../routes/auth/auth_router')
const userRouter = require('../routes/user/user_router')
const commentRouter = require('../routes/comments/comment_router')
const savedCommentRouter = require('../routes/saved/saved_router')

server.use(helmet(), morgan('dev'), express.json(), cors())
server.use('/api/auth', authRouter)
server.use('/api/newUser', auth, userRouter)
server.use('/api/comments', auth, commentRouter)
server.use('/api/favorites',auth,  savedCommentRouter)
 
server.get('/', (req, res) => {
	res.status(200).json({ Message: 'Welcome to the Troll Hub API' })
})

module.exports = server
