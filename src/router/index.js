import vueRouter from 'vue-router'
import Vue from 'vue'

import Main from '../view/mainIndex.vue'
import Login from '../view/login/userLogin.vue'
import personalCenter from '../view/userInfoMain.vue'
import registerLogin from '../view/login/registerLogin.vue'
import forgetPassword from '../view/login/forgetPassword.vue'

import resetUserInfo from '../view/user/resetUserInfo.vue'
import userHistory from '../view/user/userHistory.vue'
import userInfo from '../view/user/userInfo.vue'
import userMessage from '../view/user/userMessage.vue'
import userItem from '../view/userItem.vue'

//demo
import demo from '@/view/demo.vue'
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
    { path: '/userItem', component: userItem },
    
    { path: '/demo', component: demo }
]

const router = new vueRouter({
    routes,
    mode: 'history',
})

export default router;

