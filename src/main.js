import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import VueSocketIO from 'vue-socket.io'
import store from './store/index.js'
Vue.config.productionTip = false
Vue.use(elementUi);
Vue.prototype.$http = axios;
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:3000', // socket 服务器所在地址
// }));

new Vue({
  router,
  store,
  // sockets: {
  //   // 可以用来测试 是否链接成功了
  //   connect: function () {
  //       console.log('链接成功')
  //   },
  // },
  //定义vue的渲染函数，用于创建虚拟结点
  render: h => h(App),
}).$mount('#app2')//将其挂载到对应的html文件中去
