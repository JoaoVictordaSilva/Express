'use strict'

const Schema = use('Schema')

class LocationSchema extends Schema {
  up () {
    this.create('location', (table) => {
      table.increments('id_location').primary()
      table.string('nu_latitude').notNullable()
      table.string('nu_longitude').notNullable()
      table.integer('id_person')
      table.foreign('id_person').references('person.id_person').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('location')
  }
}

module.exports = LocationSchema
