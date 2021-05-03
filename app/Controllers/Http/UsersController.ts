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

		const token = await auth.use('api').attempt(pseudo, password)

    return token.toJSON()
	}

	public async logout({ auth, response }: HttpContextContract) {
		await auth.use('api').logout()
		return response.noContent()
	}
}
