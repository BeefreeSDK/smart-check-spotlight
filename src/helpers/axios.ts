import axios, {
  AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig,
} from 'axios'
import { v4 as uuidv4 } from 'uuid'
import mem from 'mem'

// CustomAxios Interfaces are needed by TS to manage custom props on config
interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean
}
interface CustomAxiosError extends AxiosError {
  config?: CustomAxiosConfig
}

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEPATH,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
}) 

const loginV2Fn = async (template_type: string) => clientAxiosInstance.post('/api/auth/login', { template_type })
const refreshTokenFn = async () => clientAxiosInstance.post('/api/auth/refresh')

/**
 * Memorized functions prevents multiple parallel calls to bee-auth,
 * max age set to 10 secs to include all http request on the same page
 */
const memorizedLoginV2 = mem(loginV2Fn, { maxAge: 10000 })
const memorizedRefreshToken = mem(refreshTokenFn, { maxAge: 10000 })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bearerInterceptor = (config: any) => {
  if (config.withCredentials === false) {
    return config
  }

  const token = localStorage.getItem(process.env.NEXT_PUBLIC_BEEFREE_ACCESS_TOKEN_NAME)
  const uid = localStorage.getItem(process.env.NEXT_PUBLIC_BEEFREE_UID)
  
  if (!uid) {
    localStorage.setItem(process.env.NEXT_PUBLIC_BEEFREE_UID, `${process.env.NEXT_PUBLIC_BEEFREE_UID_PREFIX}-${uuidv4()}`)
  }

  return {
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${token}`,
    uid,
  },
  }
}

const errorInterceptor = async (error: CustomAxiosError) => {
  const { config } = error
  if (config) {
    const template_type = config?.params?.get('template_type') ?? 'email'

    /**
     * config.sent props solves loop issues towards bee auth
     * if refresh and login for some reasons still return 401 or 440
     * error codes a loop could occur.
     * Sent flag prevent that the same request infinitely receives
     * its "triggering" error code: 401 -> refresh, 440 -> login
    */
    let result
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true
      result = await memorizedRefreshToken()
    } else if (error?.response?.status === 440 && !config.sent) {
      config.sent = true
      result = await memorizedLoginV2(template_type)
    }

    return result ? clientAxiosInstance(config) : Promise.reject(error)
  }
  return Promise.reject(error)
}

const responseInterceptor = async (response: AxiosResponse) => {
  const config = response?.config

  // If the response comes from refresh or login calls, store the new token
  if (config?.url?.match(/(\/refresh|\/login)/)) {
    const { access_token } = response.data
    const tokenName = process.env.NEXT_PUBLIC_BEEFREE_ACCESS_TOKEN_NAME
    if (access_token && tokenName) {
      localStorage.setItem(tokenName, access_token)
    }
  }
  return response
}

clientAxiosInstance.interceptors.request.use(bearerInterceptor)

clientAxiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)

export { clientAxiosInstance }
