import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
	protected tableName = 'todos'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.string('title').notNullable()
			table.string('content').nullable()
			table.integer('status').notNullable().defaultTo(0)
			table.timestamps(true)
			table.integer('userId').unsigned()
			table.foreign('userId').references('users.id')
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
