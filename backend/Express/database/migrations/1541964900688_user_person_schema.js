'use strict'

const Schema = use('Schema')

class UserPersonSchema extends Schema {
  up () {
    this.withSchema('express').createTable('user_person', (table) => {
      table.increments('id_user_person').primary()
      table.timestamps()
      table.foreign('id_person').references('id_person').inTable('express.person').onUpdate('CASCADE').onDelete('CASCADE')
      table.foreign('id_user').references('user_id').inTable('express.user').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('user_person')
  }
}

module.exports = UserPersonSchema
