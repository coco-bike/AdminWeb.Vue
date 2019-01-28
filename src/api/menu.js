import request from '@/utils/request'

export function getPageList(pageIndex,pageSize,name) {
  return request({
    url: '/Module/ListPage',
    method: 'get',
    data: {
        'pageIndex':pageIndex,
        'pageSize':pageSize,
        'name':name
    }
  })
}
