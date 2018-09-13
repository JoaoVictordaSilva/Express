'use strict'

const Model = use('Model')

class Address extends Model {


    relative () {
        return this.hasMany('App/Models/Relative')
    }

    person () {
        return this.hasMany('App/Models/Person')
    }

}

module.exports = Address
