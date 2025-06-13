import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, auth }: HttpContext) {
    const payload = request.only(['username', 'email', 'password'])

    const user = new User()
    user.fullName = payload.username
    user.email = payload.email
    user.password = payload.password
    await user.save()

    return await auth.use('api').createToken(user)
  }

  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    console.log('Email:', email)
    console.log('Password:', password)

    const user = await User.verifyCredentials(email, password)

    return await auth.use('api').createToken(user)
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }

  async me({ auth }: HttpContext) {
    return auth.use('api').user
  }
}
