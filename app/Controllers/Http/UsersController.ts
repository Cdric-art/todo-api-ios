import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'

export default class UsersController {
	public async register({ request, response }: HttpContextContract) {
		const payload = await request.validate(UserValidator)
		const user = await User.create(payload)

		return response.ok(user)
	}

	public async login({ auth, request }: HttpContextContract) {
		const { pseudo, password } = request.only(['pseudo', 'password'])

		await auth.attempt(pseudo, password)
    console.log(auth.user?.toJSON())
		return auth.user?.toJSON()
	}

	public async logout({ auth, response }: HttpContextContract) {
		await auth.logout()
		return response.noContent()
	}
}
