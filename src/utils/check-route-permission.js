import { useLoginUser } from '../hooks/use-login-user'

// value 如果存在必须是一个 ['admin'] 这样的数组
export function checkRoutePermission(value) {
  const {
    user: { roles },
  } = useLoginUser()
  if(roles.includes['admin']) return true
  if (value && value instanceof Array) {
    if (value.length > 0) {
      return roles.some((role) => value.includes(role))
    }
    return false
  }
  return true
}
