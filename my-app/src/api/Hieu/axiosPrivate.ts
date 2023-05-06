import axios from 'axios'
import { getToken, saveToken } from '../../config/auth'
import AuthApi from './AuthApi'

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5014/api',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
})
const { access_token, refresh_token } = getToken()

axiosPrivate.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // gắn token vào header
    const token = getToken()
    config.headers['Authorization'] = `Bearer ${token.access_token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosPrivate.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const prevRequest = error.config
    // anthentication
    if (error?.response?.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true

      await AuthApi.refreshToken({
        accessToken: access_token,
        refreshToken: refresh_token
      }).then(res => {
        saveToken(res.accessToken, res.refreshToken)
        window.location.reload()
      })
    }
    // authozire
    if (error?.response?.status === 403 && !prevRequest.sent) {
      window.location.href = '/access-denied'
    }

    return Promise.reject(error)
  }
)

export default axiosPrivate
