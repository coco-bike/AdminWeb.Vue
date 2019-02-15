import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login/GetJWTToken3',
    method: 'post',
    data: {
      name: username,
      pass: password
    }
  })
}

export function getInfo(uid) {
  return request({
    url: '/userrole/GetRoles',
    method: 'get',
    params: { uid:uid }
  })
}

export function logout(uid) {
  return request({
    url: '/login/LoginOut',
    method: 'post',
    params: { uid:uid }
  })
}
