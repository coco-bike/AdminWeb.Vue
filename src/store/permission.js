// store/permission.js
import {
  constantRouterMap,getasyncRouterMap,asyncRouterMap
} from '@/router/index';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        // commit('SET_ROUTERS', asyncRouterMap);
        // resolve();
        getasyncRouterMap().then(r => {
            ///整理菜单层级关系
            let accessedRouters =r.filter(v => {
              const {
                roles
              } = data;
              //if (roles.indexOf('admin') >= 0) return true;
              if (hasPermission(roles, v)) {
                if (v.children && v.children.length > 0) {
                  v.children = v.children.filter(child => {
                    if (hasPermission(roles, child)) {
                      return child
                    }
                    return false;
                  });
                  return v
                } else {
                  return v
                }
              }
              return false;
            });
            commit('SET_ROUTERS', accessedRouters);
            console.log(accessedRouters);
            resolve();
        });
      });
    }
  }
};

export default permission;
