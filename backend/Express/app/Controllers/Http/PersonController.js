'use strict'

const Person = use('App/Models/Person')
/**
 * Resourceful controller for interacting with people
 */
class PersonController {
  /**
   * Show a list of all people.
   * GET people
   */
  async index({ request, response }) {
  }

  /**
 * Create/save a new person.
 * POST people
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
   * GET people/:id
   */
  async show({ params, request, response }) {
  }

  /**
   * Render a form to update an existing person.
   * GET people/:id/edit
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update person details.
   * PUT or PATCH people/:id
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a person with id.
   * DELETE people/:id
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PersonController
