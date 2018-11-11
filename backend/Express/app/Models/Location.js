'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Location extends Model {

    person() {
        return this.belongsTo('App/Models/Person', 'id_person')
    }

    static get table() {
        return `${schema}.location`
    }
    static get primaryKey() {
        return 'id_location'
    }
}

module.exports = Location
