const environment = process.env

const env = {
  PORT: parseInt(environment.PORT!!, 10)
}

export default env
