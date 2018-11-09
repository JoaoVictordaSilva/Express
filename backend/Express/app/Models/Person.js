'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Person extends Model {

    address() {
        return this.belongsTo('App/Models/Address', 'id_address')
    }

    images() {
        return this.hasMany('App/Models/Image', 'id_person', 'id_person')
    }

    static get table() {
        return `${schema}.person`
    }

    static get primaryKey() {
        return 'id_person'
    }

    static get hidden() {
        return ['id_address']
    }

}

module.exports = Person
