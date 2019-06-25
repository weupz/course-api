import { FastifyInstance, RouteOptions } from 'fastify'
import { refreshToken } from '../controllers/user'
import { RoutePlugin } from './types'

const refreshTokenOptions: (
  server: FastifyInstance
) => RouteOptions = server => ({
  method: 'POST',
  url: '/refresh-token',
  handler: refreshToken(server)
})

const plugin: RoutePlugin = (server, _, next) => {
  server.route(refreshTokenOptions(server))
  next()
}

export default plugin
