import request from '@/utils/request'

export function getPageList(pageIndex, pageSize) {
  return request({
    url: '/sysUserInfo/ListPage',
    method: 'post',
    data: {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
  })
}

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }

export function getInfoByID(id) {
  return request({
    url: '/sysUserInfo/GetSysUserInfo',
    method: 'get',
    params: {
      Id: id
    }
  })
}

export function saveInfoData(sysUserInfoViewModel) {
  return request({
    url: '/sysUserInfo/UpdatesysUserInfo',
    method: 'post',
    data: sysUserInfoViewModel
  })
}

export function addInfoData(sysUserInfoViewModel){
  return request({
    url: '/sysUserInfo/AddsysUserInfo',
    method: 'post',
    data: sysUserInfoViewModel
  })
}

export function deleteInfoData(id){
  return request({
    url: '/sysUserInfo/DeletesysUserInfo',
    method: 'get',
    params: {
      Id: id
    }
  })
}
