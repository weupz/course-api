const environment = process.env

const env = {
  PORT: parseInt(environment.PORT!!, 10),
  mongo: {
    uri: environment.MONGODB_URI!!,
    auth: {
      user: environment.MONGODB_USER!!,
      password: environment.MONGODB_PASSWORD!!
    }
  },
  JWT_SECRET: environment.JWT_SECRET!!
}

export const mongo = env.mongo

export default env
