import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.css'
import { ElementTiptapPlugin } from 'element-tiptap'

Vue.use(ElementUI)

Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
