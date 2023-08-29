import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
//创建Vuex实例对象

const store = new Vuex.Store({
    strict: debug,//在不是生产环境下都开启严格模式
    state: {
        userMessageConcatItem: [{
            userId:"",
            username: "AAA",
            message: "",
        }],
        userId:"",
        userMessageId:"112233",

        userMessageMain: [{
            sender: 1,//用户左右
            msg: "aaa",//用户发送的消息
        }],
        token: "",//用户的token值
        card:[{
            id: 1,
            title: 'Card 1',
            content: 'Content 1',
            src: '',
            text: ' 11'
        }],
        userdescription: "",//用户描述
        itemdescription: "",//商品描述
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
        setuserId(state,index){
            
                state.userId=index;
        },
        setConcatItems(state,items){
            // let i=0;
            state.userMessageConcatItem=items;
            // for(i;i<=items.length;i++){
            //     state.userMessageConcatItem[i].userId=items[i]. userId;
            //     state.userMessageConcatItem[i].username=items[i]. username;
            //     state.userMessageConcatItem[i].message=items[i]. message;
            // }
        }
    },
    actions: {
    }
})
export default store;
