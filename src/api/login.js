import request from '@/utils/request'

export function login(username, password) {
  debugger
  return request({
    url: '/login/GetJWTToken3',
    method: 'post',
    data: {
      name: username,
      pass: password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/userrole/GetRoles',
    method: 'get',
    params: { token:token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
