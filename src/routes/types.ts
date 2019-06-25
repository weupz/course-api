import { Plugin } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'

export interface RoutePluginOptions {
  readonly prefix?: string
}

export type RoutePlugin = Plugin<
  Server,
  IncomingMessage,
  ServerResponse,
  RoutePluginOptions
>
