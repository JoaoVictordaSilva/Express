'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const User = use('App/Models/User')

class UserController extends BaseController {


    async show({ params: { id } }) {

        return await User.find(id)

    }

    async store({ request, response }) {
        
        return super.save(request, response, new User())

    }

    async update({ request, response, params: { id } }) {

        return super.update(request, response, User, id)

    }
}

module.exports = UserController
