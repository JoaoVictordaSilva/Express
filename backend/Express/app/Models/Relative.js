'use strict'

const Model = use('Model')

class Relative extends Model {

    person () {
        return this.hasMany('App/Models/Person')
    }

    address () {
        return this.hasOne('App/Models/Address')
    }
}

module.exports = Relative
