import vueRouter from 'vue-router'
import Vue from 'vue'

import Main from '../view/mainIndex.vue'
import Login from '../view/login/userLogin.vue'
import personalCenter from '../view/userInfo.vue'
import registerLogin from '../view/login/registerLogin.vue'
import forgetPassword from '../view/login/forgetPassword.vue'

Vue.use(vueRouter);

const routes=[
    { path: '/main', component: Main },
    { path: '/login', component: Login },
    {path:'/person',component: personalCenter},
    {path:'/registeLogin',component: registerLogin},
    { path: '/forgetPassword', component: forgetPassword},
]

const router=new vueRouter({
    routes,
})

export default router;