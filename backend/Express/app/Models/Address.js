'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Address extends Model {

    relative () {
        return this.hasMany('App/Models/Relative')
    }

    person () {
        return this.hasMany('App/Models/Person')
    }

    static get table() {
        return `${schema}.address`
    }

    static get primaryKey() {
        return 'id_address'
    }

}

module.exports = Address
