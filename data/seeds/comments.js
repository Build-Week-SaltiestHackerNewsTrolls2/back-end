
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('saved').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('saved').insert([
							{
							newUser_id: 1,
								name: 'L34ky',
								comment: 'One way to test your hypothesis is to start reducing your exposure to soft plastics and materials',
								score: ''
								
							},
							{
							newUser_id: 1,
								name: 'JB',
								comment:
									'My mom is a first-generation immigrant, I often let her assumptions and misunderstandings of my son...',
								score: '5'
								
							},
							{
								newUser_id: 2,
								name: 'MZ',
								comment: 'I am not on FourSquare are they all about "stores" other commercial spaces? Or do they check in...',
								score: '10'
								
							},
						])
    });
};
