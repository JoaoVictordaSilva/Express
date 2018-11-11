'use strict'

const Schema = use('Schema')

class PersonSchema extends Schema {
  up() {
    this.withSchema('express').createTable('person', (table) => {
      table.increments('id_person').primary()
      table.string('na_person').notNullable()
      table.date('dt_birthday').notNullable()
      table.date('dt_street_time')
      table.string('ds_history')
      table.integer('id_address')
      table.foreign('id_address').references('id_address').inTable('express.address')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('person')
  }
}

module.exports = PersonSchema
