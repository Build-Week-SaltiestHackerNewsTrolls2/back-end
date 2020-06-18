const User = require('../user/user_model')
const Comment = require('../comments/comment_model')

const validUserId = (req, res, next) => {
	const { id } = req.params
	User.get(id).then((info) => {
		info ? req.info : res.status(404).json({ message: 'That User Does not Exist!' })
	})
	next()
}

const validCommentId = (req, res, next) => {
	const { id } = req.params
	Comment.get(id).then((comments) => {
		comments ? req.comments : res.status(404).json({ message: 'That Comment Does not Exist!' })
	})
	next()
}
const validUser = (req, res, next) => {
	const { email, password } = req.body
	Object.entries(req.body).length === 0
		? res.status(404).json({ message: 'No User Data' })
		: !email || !password
		? res.status(400).json({ message: 'Missing required information. Please add the description and notes! ' })
		: next()
}

const validComment = (req, res, next) => {
	const { commenter, comment } = req.body
	Object.entries(req.body).length === 0
		? res.status(404).json({ message: 'No Comment Data' })
		: !commenter || !comment
		? res.status(400).json({ message: 'Missing required information. Please add A Commenter & comment!' })
		: next()
}

module.exports = {
	validUserId,
	validUser,
	validCommentId,
	validComment,
}
