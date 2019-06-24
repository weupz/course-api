import fastify from 'fastify'
import env from './env'

const server = fastify()

server.get('/', (_, res) => {
  res.send({ message: 'Hello World' })
})

server.listen(env.PORT, (err, address) => {
  if (err) {
    // tslint:disable-next-line: no-console
    console.log(err)
  } else {
    // tslint:disable-next-line: no-console
    console.log(`listening at ${address}`)
  }
})
