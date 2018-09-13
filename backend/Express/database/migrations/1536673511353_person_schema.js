'use strict'

const Schema = use('Schema')

class PersonSchema extends Schema {
  up() {
    this.create('person', (table) => {
      table.increments('id_person').primary()
      table.string('na_person').notNullable()
      table.date('dt_birthday').notNullable()
      table.string('ds_path')
      table.date('dt_time_street')
      table.integer('id_address')
      table.foreign('id_address').references('address.id_address')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down() {
    this.drop('person')
  }
}

module.exports = PersonSchema
