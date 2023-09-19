import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import VueSocketIO from 'vue-socket.io'
import store from './store/index.js'
import Cookie from 'js-cookie'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.use(elementUi);
Vue.prototype.$http = axios;
//全局注册cookie
Vue.prototype.$cookie=Cookie;
Vue.prototype.$md5=md5;
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:3000', // socket 服务器所在地址
// }));

//生成一个cookie
if(document.cookie){
  console.log(document.cookie);
}else{
  Cookie.set("token","1122", { expires: 1440 })
}

router.beforeEach((to, from, next) => {
  const isLoggedIn = (Cookie.get('token') !==  undefined); // 使用实际的登录状态判断
  if (to.path !== '/login' && !isLoggedIn && to.path !=='/registeLogin' && to.path !=="/forgetPassword") {
      next('/login');
  } else {
      next();
  }
});
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
