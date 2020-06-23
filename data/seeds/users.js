
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('newUser').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('newUser').insert([
							{firstName: 'Kara', lastName: 'Peoples', email: 'kara@gmail.com', password: 'B-Day1978', country: 'US' },
							{ firstName: 'Tony', lastName: 'Donovan', email: 'tony@gmail.com', password: 'upside', country: 'US' },
							{  firstName: 'Ophelia', lastName: `O'Donald`, email: 'ophelia@gmail.com', password: 'lucky', country: 'Ireland' },
						])
    });
};
