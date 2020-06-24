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

const getUserFavs = (userId) => {
  return db.select('*')
    .from('saved as s')
    .join('newUser as n', 'n.id', 's.newUser_id')
    .where('s.newUser_id', userId, )
}



 module.exports ={
  get,
  getById,
  update,
   erase,
   getUserFavs,
   
 }