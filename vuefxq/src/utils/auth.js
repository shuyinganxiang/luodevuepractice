import Cookies from 'js-cookie'

const LoginKey = 'token'

export function getToken () {
  return Cookies.get(LoginKey)
}

export function setToken (token) {
  return Cookies.set(LoginKey, token)
}

export function removeToken () {
  return Cookies.remove(LoginKey)
}

export function setUserInfo (name, value) {
  return Cookies.set(name, value)
}

export function getUserInfo (name) {
  return Cookies.get(name)
}

export function removeUserInfo (name) {
  return Cookies.remove(name)
}
