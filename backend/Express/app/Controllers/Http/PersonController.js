'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const Person = use('App/Models/Person')
const Address = use('App/Models/Address')
const Location = use('App/Models/Location')

/**
 * Resourceful controller for interacting with person
 */
class PersonController extends BaseController {
  /**
   * Show a list of all person.
   * GET person
   */
  async index() {
    return await Person.query().with('address').fetch()
  }

  /**
 * Create/save a new person.
 * POST person
 */
  async store({ request, response }) {
    
    const { address } = request.post()
    
    const addressModel = new Address()

    addressModel.$attributes = {...address}
    
    await addressModel.save()

    delete request.body.address
    
    request.body = {
      ...request.body,
      id_address: addressModel.id_address
    }

    return super.save(request, response, new Person())

  }

  /**
   * Display a single person.
   * GET person/:id
   */
  async show({ params: { id } }) {
    return await Person.query()
      .where('id_person', id)
      .with('address')
      .fetch()
  }

  /**
   * Update person details.
   * PUT or PATCH person/:id
   */
  async update({ request, response, params: { id } }) {

    return super.update(request, response, Person, id)

  }

  /**
   * Delete a person with id.
   * DELETE person/:id
   */
  async destroy({ params: { id } }) {

    super.delete(Person, id)

  }

}

module.exports = PersonController
