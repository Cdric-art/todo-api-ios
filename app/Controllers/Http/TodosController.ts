import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import TodoValidator from 'App/Validators/TodoValidator'

export default class TodosController {

  public async show({ auth, response }: HttpContextContract) {
    const userId = await auth.user?.id
    const todos = await Todo.query().where('userId', userId!)

    return response.ok(todos)
  }

  public async index({ response, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)

    return response.ok(todo)
  }

  public async create({ response, request }: HttpContextContract) {
    const payload = await request.validate(TodoValidator)
    const todo = await Todo.create(payload)

    return response.created(todo)
  }

  public async updateStatus({ response, request, params }: HttpContextContract) {
    const todo = await Todo.query().where('id', params.id).update({status: request.input('status')})

    return response.ok(todo)
  }

  public async update({ params, request }: HttpContextContract) {
    const payload = await request.validate(TodoValidator)
    const todo = await Todo.findOrFail(params.id)

    return todo.merge(payload).save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()

    return response.noContent()
  }
}
