/* eslint-disable camelcase */
import { getQuery } from '@ola/utils'
import type { User, ServerEnv, App, AppConfig } from './types'

export const formatLan = (lan: string) =>
  lan.toLocaleLowerCase().replace(/-/g, '_')

export * from './types'

const {
  name = '',
  uid = '0',
  token = '',
  server_env = 'production',
  lan = formatLan(navigator.language),
  area = formatLan(navigator.language),
  icon = '',
  pkg = ''
} = getQuery()

const defaultPackage = pkg
const defaultServerEnv = server_env as ServerEnv
const defaultUser: User = {
  name,
  uid: Number(uid),
  token,
  icon,
  lan,
  area
}

export default class Ola {
  user = defaultUser

  app: App

  constructor(appConfig: AppConfig) {
    this.app = {
      config: appConfig,
      server_env: defaultServerEnv,
      pkg: defaultPackage,
      web_proxy_port: undefined
    }
  }

  customLogin(
    customLoginInfo: Partial<User> & { serverEnv: ServerEnv; pkg: string }
  ) {
    this.user = { ...this.user, ...customLoginInfo }
    this.app.server_env = customLoginInfo.serverEnv
    this.app.pkg = customLoginInfo.pkg
  }
}
