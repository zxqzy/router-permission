import { constantRoutes, asyncRoutes, hasPermit } from '../router'
// import { checkRoutePermission } from '../utils'
import { reactive } from 'vue'

const routeState = reactive({
  routes: [],
  addRoutes: [],
})

export function useRoute() {
  function filterAsyncRoutes(routes, roles) {
    const res = []

    // routes.forEach((route) => {
    //   const tmp = { ...route }
    //   if (checkRoutePermission(route.meta?.roles)) {
    //     if (tmp.children) {
    //       tmp.children = filterAsyncRoutes(tmp.children)
    //     }
    //     res.push(tmp)
    //   }
    // })
    routes.forEach((route) => {
      const tmp = { ...route }
      if (hasPermit(route, roles)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  async function generateRoute(roles) {
    let accessRoutes
    if (roles.includes('admin')) {
      accessRoutes = asyncRoutes
    } else {
      accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    Object.assign(routeState, {
      routes: constantRoutes.concat(accessRoutes),
      addRoutes: accessRoutes,
    })
  }

  return {
    routeState,
    generateRoute,
  }
}
