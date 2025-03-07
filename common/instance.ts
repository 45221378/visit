import axios, { AxiosRequestConfig } from 'axios'
import Toast from '/common/components/Toast/Toast'
import Ola from '/common/Ola'
export default function createOlaAxios(ola: Ola) {
  const instance = axios.create()

  // 设置公共参数
  instance.defaults.baseURL = ola.app.config.baseURL[ola.app.server_env]
  // instance.defaults.headers.common['user-token'] = ola.user.token
  instance.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded'
  instance.defaults.headers.common['User-Language'] = ola.user.lan
  // if (ola.app.server_env !== 'production') {
  //   instance.defaults.params = { uid: ola.user.uid }
  // }
  // toast非业务错误
  instance.interceptors.response.use(undefined, (error) => {
    if (!axios.isCancel(error)) Toast.show(error.message)
    return Promise.reject(error)
  })

  // 业务错误
  class ServiceError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ServiceError'
    }
  }

  // 约定业务数据结构
  type T<D> = D & { success: boolean; msg: string; code?: number }
  // 抛出业务错误
  async function request<D>(config: AxiosRequestConfig, noError?: boolean) {
    const response = await instance.request<T<D>>(config)
    if (response.data.success === true || noError) return response.data
    const error = new ServiceError(response.data.msg || 'unknown service error')
    if (response.data.code === 1212) {
      throw response.data
    } else {
      Toast.show(error.message)
    }
    throw error
  }

  return { instance, request }
}
