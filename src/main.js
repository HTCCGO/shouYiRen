import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Router from 'vue-router'
// import VueSocketIO from 'vue-socket.io'
import store from './store/index.js'
import Cookie from 'js-cookie'
import md5 from 'js-md5'

// axios.post('/api/token',)
const http=axios.create({
  timeout: 10000*6,
});

http.interceptors.request.use(function(request){
  const currentRoute=router.currentRoute;
  const interceptor=currentRoute.meta.interceptor;

  if(interceptor !== 'interceptorl'){
    request.data={
      ...request.data,
      token:Cookie.get("token"),
    };
  }
  return request;
});

Vue.config.productionTip = false
Vue.use(elementUi);
Vue.prototype.$http = http;

//全局注册cookie
Vue.prototype.$cookie=Cookie;
Vue.prototype.$md5=md5;

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  const isLoggedIn = (Cookie.get('token') !==  undefined); // 使用实际的登录状态判断
  if (to.path !== '/login' && !isLoggedIn && to.path !=='/registeLogin' && to.path !=="/forgetPassword" && to.path !=="/forgetPassword_") {
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
