import auth from 'basic-auth'
import brcrypt from 'bcrypt'
import {
  DefaultParams,
  DefaultQuery,
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from 'fastify'
import { IncomingMessage } from 'http'
import { getUserByEmail, saveUser } from '../models/user'

const hashPassword = (data: string) => brcrypt.hash(data, 10)

const comparePassword = (data: string, encrypted: string) =>
  brcrypt.compare(data, encrypted)

export interface LoginHeaders {
  readonly authorization: string
}

export const login = (server: FastifyInstance) => {
  const getUser = getUserByEmail(server.mongo.client.db())
  return async (
    req: FastifyRequest<
      IncomingMessage,
      DefaultQuery,
      DefaultParams,
      LoginHeaders
    >,
    rep: FastifyReply<{}>
  ) => {
    const authorization = auth(req.raw)
    if (authorization) {
      const { name, pass } = authorization
      const data = await getUser(name)
      if (data && (await comparePassword(pass, data.password!!))) {
        const user = { ...data, password: undefined }
        rep.send({ token: await rep.jwtSign(user), user })
      } else {
        rep.code(401).send()
      }
    } else {
      rep
        .code(401)
        .header('WWW-Authenticate', 'Basic realm="WeUp"')
        .send()
    }
  }
}

interface RegisterBody {
  readonly name: string
  readonly email: string
  readonly password: string
  readonly passwordConfirmation: string
}

export const register = (server: FastifyInstance) => {
  const save = saveUser(server.mongo.client.db())
  return async (
    req: FastifyRequest<IncomingMessage, {}, {}, {}, RegisterBody>,
    rep: FastifyReply<{}>
  ) => {
    const { passwordConfirmation, password, ...body } = req.body
    await save({ ...body, password: await hashPassword(password) })
    rep.send()
  }
}
