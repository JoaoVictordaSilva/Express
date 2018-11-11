'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const Person = use('App/Models/Person')
const Address = use('App/Models/Address')

/**
 * Resourceful controller for interacting with person
 */
class PersonController extends BaseController {
  /**
   * Show a list of all person.
   * GET person
   */
  async index() {
    return await Person.query()
      .with('address')
      .with('images', builder => {
        builder.where('is_profile', true)
      })
      .fetch()
  }

  /**
 * Create/save a new person.
 * POST person
 */
  async store({ request, response }) {

    await this.saveOrUpdateAddress(request)

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
      .with('images')
      .with('locations', builder => {
        builder.orderBy('created_at', 'desc')
        builder.limit(10)
      })
      .fetch()
  }

  /**
   * Update person details.
   * PUT or PATCH person/:id
   */
  async update({ request, response, params: { id } }) {

    await this.saveOrUpdateAddress(request, id)

    return super.update(request, response, Person, id)

  }

  /**
   * Delete a person with id.
   * DELETE person/:id
   */
  async destroy({ response, params: { id } }) {

    super.delete(response, Person, id)

  }

  async saveOrUpdateAddress(request, idPerson = null) {

    const { address } = request.post()

    let entity;

    if (idPerson) {

      const person = await Person.findOrFail(Number(idPerson))

      entity = await Address.findOrFail(person.id_address)

      entity.$attributes = {
        ...entity.$attributes,
        ...address
      }
      await entity.save()

    } else {

      entity = new Address()

      entity.$attributes = { ...address }

      await entity.save()

    }

    delete request.body.address

    request.body = {
      ...request.body,
      id_address: entity.id_address
    }

  }

}

module.exports = PersonController
