import router from './router'
import { useLoginUser, useRoute } from './hooks'

const whiteList = ['/login']

// 根据实际情况获得
const isLogin = true

const { user, getUser } = useLoginUser()

// 必须用路由的导航首位：
// 1. routes 应该在页面加载之前生成
// 2. 用户信息必须在加载页面之前拿到

// 可以用其它方式解决：
// 登陆成功后获取了用户信息再跳转

// 退出登陆：reset routes （重置路由），addRoutes(角色信息发生变化)
router.beforeEach(async (to, _, next) => {
  // 走 i18n
  document.title = to.meta.title
  if (isLogin) {
    if (user.roles.length) {
      next()
    } else {
      await getUser()
      const { routeState, generateRoute } = useRoute()
      generateRoute(user.roles)
      routeState.addRoutes.forEach((item) => {
        router.addRoute(item)
      })
      console.log(router.getRoutes())
      debugger
      next()
      // next({ ...to, replace: true })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

// router.beforeEach((_, _1, next) => {
//   debugger
//   next('/about')
// })

// 权限路由两种实现方法的分析
// 1. router.beforeEach
// token 保存在缓存中，而 user 信息动态获取，每次页面刷新时 user 的信息和 router 的信息都会
// 被清空，每次刷新都需要重新获取 user 信息，并且根据 roles 生成路由

// 2. watch(userInfo, refreshRoutes)
// token 和 roles 都保存在缓存中，必须实时监听，roles 一旦变更就需要 refreshRoutes

// 权限路由的关键点：
// 1. 将路由分为 constantRoutes 和 asyncRoutes
// 2. 在每次角色变更时去动态生成路由并加入到路由中
// 3. 改变角色需要初始化路由（resetRoutes）

// 注意：asyncRoutes 建议直接保存在前端
