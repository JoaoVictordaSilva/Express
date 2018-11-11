'use strict'
const Person = use('App/Models/Person')

class FindPerson {
  async handle({ request, response, params: { id_person } }, next) {
    // call next to advance the request

    const person = await Person.find(id_person)

    if (!person) {
      return response.status(204).json({
        message: 'Pessoa não encontrada',
        id: id_person
      })
    }

    request.body.id_person = person.id_person 

    await next()
  }
}

module.exports = FindPerson
