'use strict'

const Schema = use('Schema')

class ImageSchema extends Schema {
  up() {
    this.withSchema('express').createTable('image', (table) => {
      table.increments('id_image').primary()
      table.timestamps()
      table.boolean('is_profile').defaultTo(false)
      table.string('na_image').notNullable()
      table.integer('id_person').notNullable()
      table.foreign('id_person').references('id_person').inTable('express.person').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down() {
    this.drop('image')
  }
}

module.exports = ImageSchema
