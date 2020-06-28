const db = require('../../data/dbConfig')

module.exports = {
	add,
	find,
	findBy,
	findById,
}

function find() {
	return db('newUser').select('id', 'username').orderBy('id')
}

function findBy(filter) {
	return db('newUser').where(filter).orderBy('id')
}

function add(user) {
	return db('newUser')
		.insert(user, ['id'])
		.then((ids) => {
			return findById(ids[0])
		})
}

function findById(id) {
  return db('newUser').where({ id }).first()
}