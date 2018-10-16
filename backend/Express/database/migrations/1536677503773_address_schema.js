'use strict'

const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.withSchema('express').createTable('address', (table) => {
      table.increments('id_address').primary()
      table.string('na_city').notNullable()
      table.string('na_neighborhood')
      table.string('na_uf')
      table.timestamps()
    })
  }

  down () {
    this.drop('address')
  }
}

module.exports = AddressSchema
