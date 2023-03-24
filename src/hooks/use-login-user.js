import { reactive } from 'vue'

// api:
// 用户模块-user（登陆的一系列方法，暴露 token, 取用户信息的方法），

// store:
// 存储：分内存和本地存储，对于用户需要调用登陆方法，把 token 存储在本地
const user = reactive({
  roles: ['editor'],
  token: 'rfdfd',
})

// 登陆的一系列方法，取用户信息的方法
export function useLoginUser() {
  async function getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(user, { roles: ['editor'] })
        resolve()
      }, 500)
    })
  }

  function login() {
    // 登陆
  }

  function logout() {
    //退出登陆
  }

  // getUser()

  return {
    user,
    getUser,
    login,
    logout,
  }
}
