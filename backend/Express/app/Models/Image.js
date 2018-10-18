'use strict'

const Model = use('Model')
const schema = use('Env').get('DB_SCHEMA')

class Image extends Model {

    person () {
        return this.hasMany('App/Models/Person')
    }

    static get table() {
        return `${schema}.image`
    }

    static get primaryKey() {
        return 'id_image'
    }

}

module.exports = Image
