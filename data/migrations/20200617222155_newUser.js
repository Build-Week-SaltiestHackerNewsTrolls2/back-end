
exports.up = function (knex) {
	return knex.schema
		.createTable('newUser', (tbl) => {
			tbl.increments()
			tbl.string('firstName', 255).notNullable()
			tbl.string('lastName', 255).notNullable()
			tbl.string('country', 255).notNullable()
			tbl.string('email', 255).notNullable().unique()
			tbl.string('password', 255).notNullable()
		})
		.createTable('saved', (tbl) => {
			tbl.increments()
			tbl.string('name', 255).notNullable
			tbl.string('comment', 255).notNullable
			tbl.integer('score')
			tbl.integer('newUser_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('newUser')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
		})
}

exports.down = function (knex, Promise) {
	return knex.schema.dropTableIfExists('saved')
		.dropTableIfExists('newUser')
}
