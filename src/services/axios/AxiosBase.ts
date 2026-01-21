import axios from 'axios'
import AxiosResponseIntrceptorErrorCallback from './AxiosResponseIntrceptorErrorCallback'
import AxiosRequestIntrceptorConfigCallback from './AxiosRequestIntrceptorConfigCallback'
import { apiRefreshToken } from '../AuthService'
import appConfig from '@/configs/app.config'
import cookiesStorage from '@/utils/cookiesStorage'
import { TOKEN_NAME_IN_STORAGE, REFRESH_TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const AxiosBase = axios.create({
    timeout: 60000,
    baseURL: appConfig.apiPrefix,
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: unknown) => void
    reject: (reason?: unknown) => void
}> = []

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}

AxiosBase.interceptors.request.use(
    (config) => {
        return AxiosRequestIntrceptorConfigCallback(config)
    },
    (error) => {
        return Promise.reject(error)
    },
)

AxiosBase.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                        }
                        return AxiosBase(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            const storage = appConfig.accessTokenPersistStrategy
            let refreshToken = ''

            if (storage === 'localStorage') {
                refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME_IN_STORAGE) || ''
            } else if (storage === 'sessionStorage') {
                refreshToken = sessionStorage.getItem(REFRESH_TOKEN_NAME_IN_STORAGE) || ''
            } else if (storage === 'cookies') {
                refreshToken = cookiesStorage.getItem(REFRESH_TOKEN_NAME_IN_STORAGE) || ''
            }

            if (!refreshToken) {
                processQueue(new Error('No refresh token available'), null)
                // Redirect to login
                window.location.href = '/sign-in'
                return Promise.reject(error)
            }

            try {
                const response = await apiRefreshToken({ refreshToken })
                const { accessToken, refreshToken: newRefreshToken } = response

                // Store new tokens
                if (storage === 'localStorage') {
                    localStorage.setItem(TOKEN_NAME_IN_STORAGE, accessToken)
                    localStorage.setItem(REFRESH_TOKEN_NAME_IN_STORAGE, newRefreshToken)
                } else if (storage === 'sessionStorage') {
                    sessionStorage.setItem(TOKEN_NAME_IN_STORAGE, accessToken)
                    sessionStorage.setItem(REFRESH_TOKEN_NAME_IN_STORAGE, newRefreshToken)
                } else if (storage === 'cookies') {
                    cookiesStorage.setItem(TOKEN_NAME_IN_STORAGE, accessToken)
                    cookiesStorage.setItem(REFRESH_TOKEN_NAME_IN_STORAGE, newRefreshToken)
                }

                processQueue(null, accessToken)

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                }

                return AxiosBase(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError as Error, null)
                // Clear tokens and redirect to login
                if (storage === 'localStorage') {
                    localStorage.removeItem(TOKEN_NAME_IN_STORAGE)
                    localStorage.removeItem(REFRESH_TOKEN_NAME_IN_STORAGE)
                } else if (storage === 'sessionStorage') {
                    sessionStorage.removeItem(TOKEN_NAME_IN_STORAGE)
                    sessionStorage.removeItem(REFRESH_TOKEN_NAME_IN_STORAGE)
                } else if (storage === 'cookies') {
                    cookiesStorage.removeItem(TOKEN_NAME_IN_STORAGE)
                    cookiesStorage.removeItem(REFRESH_TOKEN_NAME_IN_STORAGE)
                }
                window.location.href = '/sign-in'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        AxiosResponseIntrceptorErrorCallback(error)
        return Promise.reject(error)
    },
)

export default AxiosBase
