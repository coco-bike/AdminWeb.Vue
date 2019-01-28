import request from '@/utils/request'

export function getPageList(pageIndex, pageSize, name) {
  return request({
    url: '/Module/ListPage',
    method: 'get',
    data: {
      'pageIndex': pageIndex,
      'pageSize': pageSize,
      'name': name
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
