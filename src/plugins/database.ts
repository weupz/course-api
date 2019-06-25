import { FastifyInstance } from 'fastify'
import mongodb from 'fastify-mongodb'
import { MongoClient } from 'mongodb'
import { mongo } from '../env'

const { uri, auth } = mongo

export default async (server: FastifyInstance) => {
  const client = await MongoClient.connect(uri, { auth, useNewUrlParser: true })
  const db = client.db()
  const user = db.collection('user')
  await user.createIndex('email', { unique: true })
  server.register(mongodb, { client })
}
