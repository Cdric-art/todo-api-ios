/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/db', async ({ response }) => {
	const report = await HealthCheck.getReport()

	return report.healthy ? response.ok(report) : response.badRequest(report)
})

// Users
Route.post('/register', 'UsersController.register')
Route.post('/login', 'UsersController.login')
Route.get('/logout', 'UsersController.logout')

// Todos
Route.group(() => {
  Route.get('/todo', 'TodosController.show')
  Route.get('/todo/:id', 'TodosController.index')
  Route.post('/todo', 'TodosController.create')
  Route.patch('/todo/:id', 'TodosController.updateStatus')
  Route.put('/todo/:id', 'TodosController.update')
  Route.delete('/todo/:id', 'TodosController.delete')
}).middleware(['auth'])
