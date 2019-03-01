import request from '@/utils/request'


export function getAsyncRouterMap(){
    return request({
        url: '/Module/ListModule',
        method: 'get',
    });
}