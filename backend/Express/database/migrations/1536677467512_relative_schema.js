'use strict'

const Schema = use('Schema')

class RelativeSchema extends Schema {
  up () {
    this.withSchema('express').createTable('relative', (table) => {
      table.increments().primary('id_relative')
      table.string('na_relative').notNullable()
      table.string('nu_phone').notNullable()
      table.date('dt_birthday').notNullable()
      table.integer('id_person')
      table.integer('id_address')
      table.foreign('id_person').references('id_person').inTable('express.person').onUpdate('CASCADE').onDelete('CASCADE')
      table.foreign('id_address').references('id_address').inTable('express.address').onUpdate('CASCADE').onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('relative')
  }
}

module.exports = RelativeSchema
