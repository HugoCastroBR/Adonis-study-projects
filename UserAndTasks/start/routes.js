'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



Route.post('/register', "UserController.store").validator('User')
Route.put('/update-user/:id',"UserController.update")

Route.post('/auth', "AuthController.store")

Route.post('reset-password','ResetPasswordController.store')
Route.put('reset-password','ResetPasswordController.update')

Route.group(() => {
  Route.resource('/tasks',"TaskController").apiOnly()
}).middleware(['auth'])
