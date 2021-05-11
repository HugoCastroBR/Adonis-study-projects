'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */

const Task = use('App/Models/Task')

class TaskController {
  
  async store ({ request, response,auth }) {
    const data = request.only(['title','description'])
    const CreateTask = await Task.create({...data,user_id: auth.user.id})
    return CreateTask
  }

  async index () {
    const tasks = await Task.query().with('user').fetch()

    return tasks
  }

  async show ({params}) {
    const task = await Task.findOrFail(params.id)
    await task.load('user')
    return task
  }

  async update ({params,request,response}) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['title','description'])
    task.merge(data)
    await task.save()
    return task
  }

  async destroy ({params}) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }

}

module.exports = TaskController
