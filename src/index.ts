import fastify from 'fastify'
import env from './env'
import auth from './plugins/auth'
import database from './plugins/database'
import routes from './routes'

const server = fastify()

server.get('/', (_, res) => {
  res.send({ message: 'Hello World' })
})
;(async () => {
  try {
    await database(server)
    await auth(server)
    routes(server)
    const address = await server.listen(env.PORT)
    // tslint:disable-next-line: no-console
    console.log(`listening at ${address}`)
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err)
  }
})()
