import request from '@/utils/request'

export function getPageList(pageIndex, pageSize) {
  return request({
    url: '/Module/ListPage',
    method: 'post',
    data: {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
  })
}

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getMenuByID(id) {
  return request({
    url: '/Module/GetModule',
    method: 'get',
    params: {
      Id: id
    }
  })
}

export function saveMenuData(moduleViewModels) {
  return request({
    url: '/Module/UpdateModule',
    method: 'post',
    data: moduleViewModels
  })
}

export function addMenuData(moduleViewModels){
  return request({
    url: '/Module/AddModule',
    method: 'post',
    data: moduleViewModels
  })
}

export function deleteMenuData(id){
  return request({
    url: '/Module/DeleteModule',
    method: 'get',
    params: {
      Id: id
    }
  })
}
