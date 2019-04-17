import request from '@/utils/request'


// export function getAsyncServerRouterMap(){
//     return request({
//         url: '/Module/ListModule',
//         method: 'get',
//     });
// }


export function getAsyncClientRouterMap(){
    return request({
        url: '/Module/ListModule',
        method: 'get',
    });
}