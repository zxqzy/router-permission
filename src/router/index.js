import { createRouter, createWebHistory } from 'vue-router'

// 静态的路由（路由及子级路由都是静态路由）
export const constantRoutes = [
  {
    path: '/',
    redirect: 'Home',
    hidden: true,
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: () => import('../views/home.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    hidden: true,
  },
]

export const {a, b} = {a: 1, b: 2}

// 动态的路由
// parent route 是对所有的路由路由，子路由分权限，这个时候也应该放在 asyncRoutes
export const asyncRoutes = [
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于页面',
      roles: ['admin', 'editor'],
    },
    component: () => import('../views/about.vue'),
  },
  {
    path: '/permission',
    name: 'Permission',
    meta: {
      title: '权限页面',
      roles: ['admin'],
    },
    component: () => import('../views/permission.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
})

export function addRoutes(routes) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}

export function hasPermit(route, roles) {
  if (roles.includes('admin')) return true
  if (!route.meta?.roles) return true
  return roles.some((role) => route.meta.roles.includes(role))
}

export function resetRoutes() {
  router.getRoutes().forEach((route) => {
    if (!constantRoutes.find((item) => item.path === route.path)) {
      router.removeRoute(route.name)
    }
  })
}

export default router



// 使用 vite-plugin-pages 如何实现权限路由

// 1. 在需要权限配置的页面中加入自定义的 Route Data，比如
// <route>
// {
//   meta: {
//     roles: ['admin']
//   }
// }
// </route>
// 2. 根据自动生成的 routes 筛选出 constantRoutes 和 asyncRoutes(根路由及子路由都没有 roles 标记即为 constantRoutes，否则为 asyncRoutes)，
// router 可提供 初始化路由、添加路由、判断某个角色是否对某个路由有权限的方法
// 3. 管理路由信息和用户信息（包括 token 和 角色）
// 4. 每次角色变更时初始化路由并且添加当前角色的路由（addRoutes）
