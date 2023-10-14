import vueRouter from 'vue-router'
import Vue from 'vue'

import home from '../view/mainIndex.vue'
import Login from '../view/login/userLogin.vue'
import personalCenter from '../view/userInfoMain.vue'
import registerLogin from '../view/login/registerLogin.vue'
import forgetPassword from '../view/login/forgetPassword.vue'
import forgetPassword_ from '../view/login/forgetPassword_.vue'

import resetUserInfo from '../view/user/resetUserInfo.vue'
import userHistory from '../view/user/userHistory.vue'
import userInfo from '../view/user/userInfo.vue'
import userMessage from '../view/user/userMessage.vue'
import userItem from '../view/userItem.vue'
import seach from'../view/seachMain.vue'
import succes from './../view/succes.vue'
import error from '../view/error.vue'
import merchant from '../view/merchant.vue'
import upDataItem from '../view/merchant/merchantUpDataItem.vue'
import pay from '../view/Pay.vue'
import merchantUserInfo from '../view/merchant/merchantUserInfo.vue'
import merchantUserHistory from '../view/merchant/merchantUserHistory.vue'
import merchantUserMessage from '../view/merchant/merchantUsermessage.vue'
import merchantResetUserInfo from '../view/merchant/merchantResetUserInfo.vue'

import demo from '../view/demo.vue'

Vue.use(vueRouter);

const routes = [
    { path: '/home', component: home },

    { path: '/login', component: Login },
    { path: '/person', component: personalCenter },
    { path: '/registeLogin', component: registerLogin },
    { path: '/forgetPassword', component: forgetPassword },
    { path: '/forgetPassword_', component: forgetPassword_ },

    { path: '/userInfo', component: userInfo },
     { path: '/userMessage', component: userMessage },
    { path: '/userHistory', component: userHistory },
     { path: '/resetUserInfo', component: resetUserInfo },
    { path: '/userItem', component: userItem },

    { path: '/seach', component: seach },
    { path: '/demo', component: demo },


    { path: '/succes', component: succes },
    { path: '/error', component: error },
    { path: '/merchant', component: merchant },
    { path: '/upDataItem', component: upDataItem },
    { path: '/pay', component: pay },

    
    { path: '/merchant/userInfo', component: merchantUserInfo },
    { path: '/merchant/UserHistory', component: merchantUserHistory },
    { path: '/merchant/UserMessage', component: merchantUserMessage },
    { path: '//merchant/resetUser', component: merchantResetUserInfo },
]

const router = new vueRouter({
    routes,
    mode: 'history',
})

export default router;

