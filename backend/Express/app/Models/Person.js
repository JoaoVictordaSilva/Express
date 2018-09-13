'use strict'

const Model = use('Model')

class Person extends Model {

    address () {
        return this.hasOne('App/Models/Address')
    }


}

module.exports = Person
