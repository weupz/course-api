import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { getUserById, User } from '../models/user'

export const refreshToken = (server: FastifyInstance) => {
  const getUser = getUserById(server.mongo.client.db())
  return async (req: FastifyRequest, rep: FastifyReply<{}>) => {
    const decoded = await req.jwtVerify<User>()
    const user = await getUser(decoded._id!!)
    if (user) {
      rep.send({ token: await rep.jwtSign(user), user })
    } else {
      rep.code(402).send()
    }
  }
}
