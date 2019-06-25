import Ajv from 'ajv'
import { FastifyInstance } from 'fastify'
import auth from './auth'
import user from './user'

export default (server: FastifyInstance) => {
  const compiler = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    nullable: true,
    $data: true
  })
  server.setSchemaCompiler(schema => compiler.compile(schema))
  server.register(auth, { prefix: '/auth' })
  server.register(user, { prefix: '/user' })
}
