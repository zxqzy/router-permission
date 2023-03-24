import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import './permission'
import auth from './auth'

const app = createApp(App)

// beforeEach 是否可以定义多次
// 不能，会导致死循环，导出 router 跳转的最大限度

// vue-router
app.use(router)
// app.use(store)

// client(client 要使用 token, user 要使用 api) // 不要形成循环依赖
// client -> store(token)
// store(user) -> api
// api -> client
// app.use()

app.use(auth)
// auth 模块，传 user 和 router
// watch(userInfo, refreshRoutes)

app.mount('#app')

// 跨页面的通信（同源）
