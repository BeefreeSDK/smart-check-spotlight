import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"
import { v4 as uuidv4 } from "uuid"

const tokenName = "token"

const clientAxiosInstance: AxiosInstance = axios.create({
  headers: { "Content-Type": "application/json" }
})

const bearerInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(tokenName)
  config.headers.set("Authorization", `Bearer ${token}`)
  config.headers.set("uid", uuidv4())
  return config
}

const responseInterceptor = async (response: AxiosResponse) => {
  const config = response?.config
  if (config?.url?.match(/(\/refresh|\/login)/)) {
    const { access_token } = response.data
    if (access_token) {
      localStorage.setItem(tokenName, access_token)
    }
  }
  return response
}

const loginV2 = async (template_type: string) =>
  clientAxiosInstance.post("/api/auth/login", { template_type })

const refreshToken = async () => clientAxiosInstance.post("/api/auth/refresh")

const errorInterceptor = async (error: AxiosError) => {
  const { config } = error
  if (config) {
    const template_type = config?.params?.get("template_type") ?? "email"
    let result
    if (error?.response?.status === 401) {
      result = await refreshToken()
    } else if (error?.response?.status === 440) {
      result = await loginV2(template_type)
    }

    return result ? clientAxiosInstance(config) : Promise.reject(error)
  }
  return Promise.reject(error)
}

clientAxiosInstance.interceptors.request.use(bearerInterceptor)

clientAxiosInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor
)

export { clientAxiosInstance }
