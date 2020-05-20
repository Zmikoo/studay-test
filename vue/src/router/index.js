import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forgetpsd',
    name: 'forgetPsd',
    component: () => import('@/views/login/forget-psd'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    },
    {
      path: '/avatarSet',
      name: 'AvatarSet',
      component: () => import('@/views/avatarset/avatarset'),
      meta: { title: '账号设置', icon: 'form' },
      hidden: true
    }]
  },

  {
    path: '/userInquire',
    component: Layout,
    redirect: '/example/table',
    name: 'UserInquire',
    meta: { title: '用户查询', icon: 'example' },
    children: [
      {
        path: 'leader',
        name: 'userInquireLeader',
        component: () => import('@/views/table/user-search'),
        meta: { title: '领导信息', icon: 'table' }
      },
      {
        path: 'staff',
        name: 'userInquireStaff',
        component: () => import('@/views/table/user-search'),
        meta: { title: '员工信息', icon: 'tree' }
      },
      {
        path: 'detail',
        name: 'userInquireDetail',
        component: () => import('@/views/table/search-detail'),
        meta: { title: '详情', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/station',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Station',
        component: () => import('@/views/table/job-position-connect'),
        meta: { title: '员工工位关联', icon: 'form' }
      },
      {
        path: 'createConnect',
        name: 'createConnect',
        component: () => import('@/views/table/create-connect'),
        meta: { title: '创建关联', icon: 'tree' },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/scoreInquire',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'ScoreInquire',
  //   meta: {
  //     title: '成绩查询',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'staff',
  //       component: () => import('@/views/table/user-search'), // Parent router-view
  //       name: 'scoreInquireStaff',
  //       meta: { title: '员工成绩' }
  //     },
  //     {
  //       path: 'station',
  //       component: () => import('@/views/table/user-search'),
  //       name: 'scoreInquireStation',
  //       meta: { title: '工位成绩' }
  //     }
  //   ]
  // },
  // {
  //   path: '/appUseDetail',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'AppUseDetail',
  //       component: () => import('@/views/table/appuse-detail'),
  //       meta: { title: 'App使用情况', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/resource',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Resource',
    meta: {
      title: '资源管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'trainVideo',
        component: () => import('@/views/table/resource'), // Parent router-view
        name: 'TrainVideo',
        meta: { title: '资源管理' }
      },
      // {
      //   path: 'virtualModel',
      //   component: () => import('@/views/table/resource'),
      //   name: 'VirtualModel',
      //   meta: { title: '工位虚拟模型' }
      // }
    ]
  },
  {
    path: '/managerAccount',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ManagerAccount',
        component: () => import('@/views/table/manager-account'),
        meta: { title: '管理员账号管理', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
