import { FastifyInstance } from 'fastify'
import auth from 'fastify-auth'
import jwt from 'fastify-jwt'
import env from '../env'

export default (server: FastifyInstance) => {
  server.register(jwt, { secret: env.JWT_SECRET, sign: { expiresIn: '30d' } })
  server.register(auth)
}
