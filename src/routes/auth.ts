import {
  DefaultParams,
  DefaultQuery,
  FastifyInstance,
  RouteOptions
} from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { login, LoginHeaders, register } from '../controllers/auth'
import { RoutePlugin } from './types'

const loginOptions: (
  server: FastifyInstance
) => RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  DefaultQuery,
  DefaultParams,
  LoginHeaders
> = server => ({
  method: 'POST',
  url: '/login',
  schema: {
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: {
        authorization: { type: 'string' }
      }
    }
  },
  handler: login(server)
})

const registerOptions: (server: FastifyInstance) => RouteOptions = server => ({
  method: 'POST',
  url: '/register',
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password', 'passwordConfirmation'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        passwordConfirmation: { type: 'string', const: { $data: '1/password' } }
      }
    }
  },
  handler: register(server)
})

const plugin: RoutePlugin = (server, _, next) => {
  server.route(loginOptions(server))
  server.route(registerOptions(server))
  next()
}

export default plugin
