import { type App } from 'vue'
import sanitize from './sanitize'

export default {
  install(app: App) {
    app.directive('sanitize', sanitize)
  },
}
