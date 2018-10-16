'use strict'

const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.withSchema('express').createTable('images', (table) => {
      table.increments('id_image').primary()
      table.timestamps()
      table.string('ds_path').notNullable()
      table.integer('id_person').notNullable()
      table.foreign('id_person').references('id_person').inTable('express.person').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
