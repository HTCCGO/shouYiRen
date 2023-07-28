import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(elementUi);
Vue.prototype.$http = axios;

new Vue({
  router,
  //定义vue的渲染函数，用于创建虚拟结点
  render: h => h(App),
}).$mount('#app2')//将其挂载到对应的html文件中去
