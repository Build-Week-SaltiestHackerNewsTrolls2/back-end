const db = require('../../data/dbConfig')




const get = () => {
  return db('saved')
}

function getById(id) {
	return db('saved').where({ id }).first()
}

function add(comment) {
	return db('saved')
		.insert(comment)
		.then((ids) => {
			return getById(ids[0])
		})
}

const erase = (id) => {
	return db('saved').where('id', id).del()
}

module.exports = {
  
	get,
	add,
	getById,
	erase,
}
