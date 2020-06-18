const db = require('../../data/dbConfig')


const get = () =>{
  return db('newUser')
}

const getById = (id) => {
  return db('newUser')
		.where({ id })
		.first()
}

const update = (id, data) => {
return db('newUser').where({ id }).update(data)
}

const erase = (id) => {
return db('newUser').where('id', id).del()
}




 module.exports ={
  get,
  getById,
  update,
  erase,
 }