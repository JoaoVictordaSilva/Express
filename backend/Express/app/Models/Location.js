'use strict'

const Model = use('Model')


class Location extends Model {

    person () {
        return this.hasMany('App/Models/Person')
    }
}

module.exports = Location
