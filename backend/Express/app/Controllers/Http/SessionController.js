'use strict'
const BaseController = use('App/Controllers/Http/BaseController')

class SessionController extends BaseController {

    async create({ request, auth }) {
        
        const { email, password } = request.all()

        return await auth.attempt(email, password)
    }
}

module.exports = SessionController
