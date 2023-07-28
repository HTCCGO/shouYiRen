import vueRouter from 'vue-router'
import Vue from 'vue'

import Main from '../view/mainIndex.vue'
import Login from '../view/login/userLogin.vue'
import personalCenter from '../view/userInfoMain.vue'
import registerLogin from '../view/login/registerLogin.vue'
import forgetPassword from '../view/login/forgetPassword.vue'

import resetUserInfo from '../view/resetUserInfo.vue'
import userHistory from '../view/userHistory.vue'
import userInfo from '../view/userInfo.vue'
import userMessage from '../view/userMessage.vue'

Vue.use(vueRouter);

const routes = [
    { path: '/main', component: Main },

    { path: '/login', component: Login },
    { path: '/person', component: personalCenter },
    { path: '/registeLogin', component: registerLogin },
    { path: '/forgetPassword', component: forgetPassword },

    { path: '/userInfo', component: userInfo },
    { path: '/userMessage', component: userMessage },
    { path: '/userHistory', component: userHistory },
    { path: '/resetUserInfo', component: resetUserInfo },
]

const router = new vueRouter({
    routes,
    mode: 'history',
})

export default router;