'use strict'

const Model = use('Model')
const scheme = use('Env').get('DB_SCHEMA')

class Location extends Model {

    person () {
        return this.hasMany('App/Models/Person')
    }

    static get table() {
        return `${scheme}.location`
    }
    static get primaryKey() {
        return 'id_location'
    }
}

module.exports = Location
