'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Relative extends Model {

    person () {
        return this.hasMany('App/Models/Person')
    }

    address () {
        return this.hasOne('App/Models/Address')
    }

    static get table() {
        return `${schema}.relative`
    }

    static get primaryKey() {
        return 'id_relative'
    }
}

module.exports = Relative
