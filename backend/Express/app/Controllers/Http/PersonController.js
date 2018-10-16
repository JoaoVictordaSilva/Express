'use strict'

const Person = use('App/Models/Person')
/**
 * Resourceful controller for interacting with person
 */
class PersonController {
  /**
   * Show a list of all person.
   * GET person
   */
  async index() {
    return await Person.all();
  }

  /**
 * Create/save a new person.
 * POST person
 */
  async store({ request, response }) {
    const body = request.post();

    const person = new Person();

    person.$attributes = {
      ...body
    }

    await person.save();

    return 'ok'
  }

  /**
   * Display a single person.
   * GET person/:id
   */
  async show({ params, request, response }) {
  }

  /**
   * Render a form to update an existing person.
   * GET person/:id/edit
   */
  async edit({ params, request }) {



  }

  /**
   * Update person details.
   * PUT or PATCH person/:id
   */
  async update({ params, request }) {

    const body = request.post()

    const person = await Person.find(params.id)

    person.$attributes = {
      ...person.$attributes,
      ...body
    }

    await person.save()

    return 'ok'
  }

  /**
   * Delete a person with id.
   * DELETE person/:id
   */
  async destroy({ params, request, response }) {

    const person = await Person.find(params.id)
    person.delete();

  }
}

module.exports = PersonController
