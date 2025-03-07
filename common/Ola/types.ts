export type ServerEnv =
  | 'local'
  | 'development'
  | 'alpha'
  | 'beta'
  | 'production'

export type AppConfig = {
  readonly appName: string
  readonly domain: string
  readonly region: 'oversea' | 'mainland'
  readonly baseURL: Partial<Record<ServerEnv, string>>
  readonly oss: string
  readonly download?: {
    readonly ios: string
    readonly android: string
  }
  readonly thinkingdata?: {
    appid: string
  }
}

export type User = {
  name: string
  uid: number
  icon: string
  token: string
  lan: string
  area: string
  online_rid?: number | string
}

export type App = {
  config: AppConfig
  server_env: ServerEnv
  pkg: string
  web_proxy_port?: number
}
