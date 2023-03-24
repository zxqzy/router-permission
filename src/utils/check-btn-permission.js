import { useLoginUser } from '../hooks/use-login-user'

const editorPermissionBtns = ['Home:Add', 'Home:Edit']
const otherPermissionBtns = ['Home:Delete']

const btnPermissionMap = {
  editor: editorPermissionBtns,
  other: otherPermissionBtns,
}

// value 必须是一个字符串
export function checkBtnPermission(value) {
  const {
    user: { roles },
  } = useLoginUser()

  if (roles.includes('admin')) {
    return true
  }

  const permissionBtns = roles.reduce((acc, role) => {
    acc.push(...(btnPermissionMap[role] ?? []))
    return acc
  }, [])

  return permissionBtns.includes(value)
}
