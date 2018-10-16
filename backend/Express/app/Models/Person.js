'use strict'

const Model = use('Model')
const scheme = use('Env').get('DB_SCHEMA')

class Person extends Model {
  
    address() {
        return this.hasOne('App/Models/Address')
    }

    image() {
        return this.hasMany('App/Models/Image')
    }
    static get table() {
        this.test = 'testando';
        return `${scheme}.person`
    }

    static get primaryKey() {
        return 'id_person'
    }

}

module.exports = Person
