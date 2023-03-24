// 权限按钮展示指令
import { useLoginUser } from '../hooks'

const { user } = useLoginUser()

// value 的值为角色的数组，代表着哪些角色拥有当前的按钮权限
// 按钮只要对当前的角色之一有权限，就代表当前登陆用户对按钮有权限
function checkBtnPermission(value) {
  if (value && value instanceof Array) {
    return user.roles.some((role) => value.includes(role))
  } else {
    throw new Error(`v-btn-auth must has value like ['admin']`)
  }
}

export function install(app) {
  app.directive('btn-auth', {
    mounted: function(el, binding) {
      if (!checkBtnPermission(binding.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
