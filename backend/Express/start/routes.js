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
}).prefix('api')
