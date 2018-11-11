'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const Location = use('App/Models/Location')
const Person = use('App/Models/Person')

class LocationController extends BaseController {

    async store({ request, response }) {

        return super.save(request, response, new Location())
    }

    async update({ request, response }) {
        
        return super.update(request, response, Person, id)

    }

    async destroy({ response, params: { id_person, id } }) {

        await Person.findOrFail(id_person)

        super.delete(response, Location, id)
    }

}

module.exports = LocationController
