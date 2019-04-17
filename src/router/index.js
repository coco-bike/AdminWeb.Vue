import Vue from 'vue';
import Router from 'vue-router';
import {
  getAsyncClientRouterMap
} from '@/api/router';
import {
  setTreeData
} from '@/utils/menutree.js';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

const map = {
  Layout: () => import('@/views/layout/Layout'),
  Form: () => import('@/views/form/index'),
  TinymceDemo: () => import('@/views/components-demo/tinymce'),
  Menu: () => import('@/views/menu/index'),
  Tree:()=>import('@/views/tree/index'),
  Nested:()=>import('@/views/nested/menu1'),
  Menu1:()=>import('@/views/nested/menu1/index'),
  Menu11:()=>import('@/views/nested/menu1/menu1-1/index'),
  Menu2:()=>import('@/views/nested/menu2/index'),
  Menu12:()=>import('@/views/nested/menu1/menu1-2'),
  Tinymce:()=>import('@/views/components-demo/tinymce'),
  User:()=>import('@/views/user/index')
}


export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: "首页",
        icon: 'index'
      }
    }]
  }
]


export function getasyncRouterMap(){
  return new Promise(resolve => {
    getAsyncClientRouterMap().then(r => {
      if (r.Success) {

        ///清洗后台数据
        let maps = new Array();

        r.Datas.forEach(element => {
          maps.push({
            path: element.Path,
            hidden: element.Hidden,
            component: map[element.Component],
            redirect: element.Redirect ? element.Redirect : null,
            name: element.Name,
            meta: {
              title: element.Title,
              icon: element.Icon,
              role: element.Meta.Role
            },
            children: null,
            id: element.Id,
            parentId: element.ParentId,
          })
        });
        resolve(setTreeData(maps));
      }
    });
  });
}



export const asyncRouterMap = [{
    path: '/example',
    hidden: true,
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '例子',
      icon: 'example'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {
          title: '表格',
          icon: 'table',
          role: ['Admin', 'super_editor']
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '树',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: '表单',
        icon: 'form',
        role: ['Admin', 'super_editor']
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '嵌套路由',
      icon: 'nested',
      role: ['Admin', 'super_editor']
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: 'Menu1'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: 'Menu1-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: 'Menu1-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: 'Menu1-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: 'Menu1-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: 'Menu1-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {
          title: 'menu2'
        }
      }
    ]
  },
  {
    path: '/tinymce',
    component: () => import('@/views/layout/Layout'),
    children: [{
      path: 'tinymce',
      name: 'TinymceDemo',
      component: () => import('@/views/components-demo/tinymce'),
      meta: {
        title: 'tinymce',
        icon: 'eye',
        role: ['Admin', 'super_editor']
      }
    }]
  },
  {
    path: '/menu',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Menu',
      component: () => import('@/views/menu/index'),
      meta: {
        title: '菜单管理',
        icon: 'menuadmin',
        role: ['Admin', 'super_editor']
      }
    }]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: '链接',
        icon: 'link',
        role: ['Admin', 'super_editor']
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
