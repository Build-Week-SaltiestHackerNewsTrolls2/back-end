const db = require('../../data/dbConfig')




const get = () => {
  return db('saved')
}

const getById = (id) => {
	return db('saved').where({ id }).first()
}

const add = (comment) => {
	return db('saved')
		.insert(comment)
		.then((ids) => {
			return getById(ids[0])
		})
}

const erase = (id) => {
	return db('user_save_comments as u')
		.innerJoin('s.*')
		.from('saved as s')
    .where('u.saved_id','u.newUser_id', id).del()
}

module.exports = {
  
	get,
	add,
	getById,
	erase,
}
