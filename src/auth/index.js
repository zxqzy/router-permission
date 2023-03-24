import { install as installBtnAuth } from './btn'
import { install as installRouterAuth } from './router'

export default {
  install: (app) => {
    installRouterAuth()
    installBtnAuth(app)
  },
}
