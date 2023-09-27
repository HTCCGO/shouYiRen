import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象

const store = new Vuex.Store({
    strict: debug,//在不是生产环境下都开启严格模式
    state: {
        phoneNumber:"",
        userMessageConcatItem: [{
            userId:"",
            username: "AAA",
            message: "",
        }],

        code:true,//存储用户的数据类型，如果为true,说明是用户，如果为flase，说明是商户
        router:"/home",

        userId:"123",
        userMessageId:"112233",

        userMessageMain: [{
            sender: 1,//用户左右
            msg: "aaa",//用户发送的消息
        }],

        ItemId:"",
        seach_txt:"",
        seach_card:[],
        userdescription: "",//用户描述
        itemdescription: "",//商品描述

        page:{
                 pageNo: 1,//默认当前页面为第一页
                 pagesize: 8,//默认当前每页的数据为4条
                 totalCount: 0//默认总数为0
        },
        sizePage:{
            pageNo: 1,//默认当前页面为第一页
            pagesize: 8,//默认当前每页的数据为4条
            totalCount: 0//默认总数为0
   }
   
    },
    getters: {
    },
    mutations: {
        setAllUsername(state,username){
            var i=0;
            for(i=0;i<=state.userMessageConcat.length;i++){
                        state.userMessageConcat.username=username;
            }
        },
        setuserId(state,userId){
                state.userId=userId;
        },
        setConcatItems(state,items){
            state.userMessageConcatItem=items;
        },
        getSeachCard(state,seachCard){
            state.seach_card=seachCard;
        },
        getHomePage(state,page){
            state.page.pageNo=page.pageNo;
            state.page.pagesize=page.pagesize;
            state.page.totalCount=page.totalCount;
        },
        getSeachPage(state,page){
            state.seachPage.pageNo=page.pageNo;
            state.seachPage.pagesize=page.pagesize;
            state.seachPage.totalCount=page.totalCount;
        },
        getHomePageNo(state,page){
            state.page.pageNo=page.pageNo;
        },
        getSeachPageNo(state,page){
            state.seachPage.pageNo=page.pageNo;
        },
        getPhoneNumber(state,phoneNumber){
            state.phoneNumber=phoneNumber;
        },
        setItemId(state,itemId){
            state.ItemId=itemId;
        },
        setRouter(state,router){
            state.router=router;
        }
    },
    actions: {
    }
})
export default store;
