import { Db, ObjectID } from 'mongodb'

export interface User {
  readonly _id?: string
  readonly name: string
  readonly email: string
  readonly password?: string
}

export const getUserById = (db: Db) => {
  const collection = db.collection<User>('user')
  return (id: string) =>
    collection.findOne(
      { _id: new ObjectID(id) },
      { projection: { password: 0 } }
    )
}

export const getUserByEmail = (db: Db) => {
  const collection = db.collection<User>('user')
  return (email: string) => collection.findOne({ email })
}

export const saveUser = (db: Db) => {
  const collection = db.collection<User>('user')
  return (user: User) => collection.save(user)
}
