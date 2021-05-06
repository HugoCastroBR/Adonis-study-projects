'use strict'


const Route = use('Route')

Route.post('users','UserController.store')

Route.post('auth','SessionController.store')

Route.post('password','ForgotPasswordController.store')
Route.put('update-pass','ForgotPasswordController.update')