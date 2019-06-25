import { FastifyMiddleware, FastifyReply, FastifyRequest } from 'fastify'

export const jwtPreHandler: FastifyMiddleware = async (
  req: FastifyRequest,
  rep: FastifyReply<{}>
) => {
  await req.jwtVerify()
}
