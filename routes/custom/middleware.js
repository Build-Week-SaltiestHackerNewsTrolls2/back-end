const Users = require('../user/user_model')

const validUserId = (req, res, next) => {
	const { id } = req.params
	Users.getById(id).then((user) => {
		user ? req.user : res.status(400).json({ message: 'Invalid User ID!' })
		next()
	})
}




module.exports={
  validUserId,
}