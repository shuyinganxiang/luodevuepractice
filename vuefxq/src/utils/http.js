import axios from 'axios'
// import Qs from 'qs'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '../router'
import apis from '@/api/api'
import { error } from './message'
import common from '@/utils/common'
import store from '../store'
import { config } from 'vue/types/umd'
axios.defaults.timeout = 120000 // 愚蠢了
axios.defaults.baseURL = process.env.BASE_URL
axios.defaults.responseType = 'json'
axios.defaults.isRetryRequest = false
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'CHANNEL-TYPE': 'PC'
}

// request 拦截器
axios.interceptors.request.use(
  config => {
    // 每次请求前，先判断token 存在
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }, err => {
    Promise.reject(err)
  }
)
// response 拦截器
axios.interceptors.response(
  config => {
    const res = request.data
    if (res.retCode === '22009' || res.retCode === '22008' || res.retCode === '22006' ) {
      error(res.retMsg)
      removeToken()
      router.push('/login')
    } else if (res.retCode === '22007') {
      return apis.myApi.login.refresh()
        .then(loginRefRes => {
          if (loginRefRes.data.retCode) {
            removeToken()
            let token = setToken(loginRefRes.headers.authorization)
            const params = window.localStorage.getItem('userId')
            common.getRouteList(params, '22007')
            let config = response.config
            if (!config.isRetryRequest) {
              config.headers.Authorization = token
              let url = response.config.url
              if (response.config.data) {
                config.data = response.config.url
              }
              config.url = url.substring(url.indexOf('api/'))
              config.isRetryRequest = true
              return axios(config)
            }
          }
        })
    } else if (res.retCode === '22010') {
      const params = window.localStorage.getItem('userId')
      window.sessionStorage.removeItem('prmmList')
      common.getRouteList(params, '22010')
      store.dispatch('GetInfo')
    } else {
      return response
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400: 
          err.message = '请求无效，请确认后再次尝试'
          break
        case 401:
          err.message = '未授权，请确认后再次尝试'
          break
        case 403:
          err.message = '禁止访问，请确认后再次尝试'
          break
        case 404:
          err.message = '无法找到web站点，请确认后再次尝试'
          break
        case 408:
          err.message = '请求超时，请确认后再次尝试'
          break
        case 501:
          err.message = '不允许请求，请确认后再次尝试'
          break
        case 502:
          err.message = '网关错误，请确认后再次尝试'
          break
        case 503:
          err.message = '服务不可用，请确认后再次尝试'
          break
        case 504:
          err.message = '网关超时，请确认后再次尝试'
          break
        case 505:
          err.message = '服务器出错，请确认后再次尝试'
          break
        default: 
          err.message = `连接出错(${err.response.status})`
      }
    } else {
      err.message = '连接服务器失败！'
    }
    err(err.message)
    return Promise.reject(err)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get (url, 
      {
        params: params
      },{
        onDownloadProgress () {
          console.log(process.loades / process.total * 100)
        }
      })
      .then(response => {
        reslove(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function get1 (url, params = {}) {
  params.timeStamp = new Date().getTime()
  return new Promise ((resolve, reject) => {
    axios.get(url,
      {
        params: params
      }).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @return {promise}
 */
export function post1 (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装 put 方法
 * @param url
 * @param data
 * @return {promise}
 */
export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装 patch 方法
 * @param url
 * @param data
 * @return {promise} 
 */
export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装 delete 方法
 * @param url
 * @param data
 * @return {promise} 
 */
export function del (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      }).catch(err => {
        reject(err)
      })
  })
}
