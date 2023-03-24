import { useLoginUser, useRoute } from '../hooks'
import { watch } from 'vue'
import router, { addRoutes, resetRoutes } from '../router'

// const { user, getUser } = useLoginUser()
const { user } = useLoginUser()
const { routeState, generateRoute } = useRoute()
// const isLogin = true

const whiteList = ['/login']

export function install() {
  // 必须将 roles 一起存在缓存中，必须 immediate: true ， 才能解决 刷新后路由不存在的情况
  watch(
    () => user.roles,
    (val) => {
      resetRoutes()
      if (val.length) {
        generateRoute(val)
        addRoutes(routeState.addRoutes)
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    () => user.token,
    (token) => {
      const route = router.currentRoute.value
      console.log(route)
      if (!token && !whiteList.includes(route.path)) {
        router.push(`/about?redirect=${route.matched[0].path}`)
      }
    }
  )

  // router.beforeEach(async (to, _, next) => {
  //   // 走 i18n
  //   document.title = to.meta.title
  //   if (isLogin) {
  //     if (user.roles.length) {
  //       next()
  //     } else {
  //       await getUser()
  //       generateRoute(user.roles)
  //       addRoutes(routeState.addRoutes)
  //       next({ ...to, replace: true })
  //     }
  //   } else {
  //     if (whiteList.indexOf(to.path) !== -1) {
  //       next()
  //     } else {
  //       next(`/login?redirect=${to.path}`)
  //     }
  //   }
  // })
}
