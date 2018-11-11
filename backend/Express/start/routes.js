'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')
const Addres = use('App/Models/Address')
const Database = use('Database')


Route.group(() => {
  Route.resource('person', 'PersonController').apiOnly()
  Route.resource('person/:id_person/image', 'ImageController').apiOnly().middleware(['auth:jwt','findPerson'])
  Route.resource('person/:id_person/location', 'LocationController').apiOnly().middleware('findPerson')
  Route.resource('user', 'UserController').only(['show', 'store', 'update'])
    .validator(new Map([
      [['user.store'], ['UserValidator']],
      [['user.update'], ['UserValidator']]
    ]))
  Route.post('session', 'SessionController.create')

}).prefix('api')
