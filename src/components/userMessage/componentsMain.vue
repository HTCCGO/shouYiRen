<template>
    <div class="index">

        <div class="main" style="position: relative;" ref="scrollContainer"> <!-- eslint-disable-next-line -->
            <div style="display: flex;" v-for="(item, index) in message" :key="item.index"
                :class="{ 'user_1': item.sender === 1, 'user_2': item.sender === 2 }">
                <!-- 通过判断sender的值来讲其划分为左右两侧的 -->
                <div class="div">
                    <el-avatar size="small" :src="circleUrl"></el-avatar>
                </div>
                <div class="msg"><span>{{ item.msg }}</span></div>
            </div>
        </div>

        <div class="text">
            <textarea v-model="newMessage"></textarea>
            <div class="button">
                <el-button size="small" @click="getMessage()">发送</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
        </div>

    </div>
</template>


<script>    
export default {
    data() {
        return {
            updata: false,
            direction: 'rtl',
            newMessage: "",
            userId:"123",//对方的Id值
            socket:null,
            message: [{
                sender: 1,
                msg: "aaa",
            }, {
                sender: 2,
                msg: 'aaa',
            }, {
                sender: 1,
                msg: 'AAA',
            }, {
                sender: 2,
                msg: 'aaa',
            }, {
                sender: 1,
                msg: "aaa",
            }, {
                sender: 2,
                msg: 'aaa',
            }
            ],
        }
    },
    mounted() {
    // 使用this.$store.state.XXX可以直接访问到仓库中的状态
  },
  watch: {
    //直接监视useId的值类型
    "$store.state.userId": {   
           //eslint-disable-next-line 
        handler(newMessage,old){
            this.userId= this.$store.state.userId;
            console.log( this.userId);
        },
        deep: true,
        Immediate :true,
    },
    //userId是对面的一个值
    userId:{
        handler(){
            const fromData={
                userId:this.$store.state.userId,//对方的Id值
                token:this.$cookie.get("token"),//我方的Id值
            }
            this.$http.post("/api/userMesssage/watchUserId",fromData).then(req=>{
                this.message=req.data;
            })
        }
    }
  },
 
    methods: {
        getMessage(){
            const fromData={
                token:this.$cookie.get("token"),//我方的Id值
                userId:this.userId,//对方的Id值
                message:this.newMessage,
            }
            this.$http.post("/api/userMesssage/getNewMessage",fromData).then(req=>{ 
                this.message.push(req.data.data);
                this.newMessage='';
            });
        },
        getZhiFu(){
            //转移到支付界面
            this.$router.push('/pay');
        },
    },
};
</script>

<style lang="less" scoped>
.index {
    border-radius: 15px;
    border-top-right-radius: 15px;
    width: 800px;
    margin: 20px;
    margin-right: 0px;
    margin-top: 40px;
    box-shadow: 0 0 25px #cac6c6;
}

.main {
    margin: 0px;
    border: 1px solid #eaeaea;
    border-bottom: none;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    //关闭三个从父元素中继承的属性
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
    max-width: 800px;
    width: 798px;
    height: 475px;
    padding-top: 5px;
    overflow: auto;
    overflow-x: hidden;
}

.text {
    border: 1px solid #eaeaea;
    border-top: 1px solid #464545;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 0px;
    width: 798px;
    height: 90px;

    textarea {
        border: 0;
        outline: none;
        resize: none;
        width: 630px;
        height: 75px;
        padding-left: 8px;
        overflow: hidden; //消除滚动条
        font-family: 'Hiragino Sans GB';
        font-size: 18px;
    }

    div {
        position: relative;
        top: -40px;
        left: 642px;
    }
}

/* Add the closing curly brace here */
.user_1 {
    width: 300px;
    margin-left: 9px;
    margin-bottom: 7px;
}

.user_1 .msg {
    border: 1px solid black;
    height: 20px;
    width: auto;
    margin-top: 3px;
    margin-left: 8px;
    padding: 5px;
    border-radius: 8px;
}

.user_2 {
    margin-bottom: 7px;
    position: relative;
    left: 90%;
}

.user_2 .msg {
    border: 1px solid black;
    margin-top: 3px;
    margin-right: 11px;
    height: 20px;
    width: auto;
    padding: 5px;
    border-radius: 8px;
    position: relative;
    left: -33px;
}

.user_2 .el-avatar {
    position: relative;
    left: 40px;
}

.div {
    margin-top: 5px;
}

.aLittle {
    border: 1px solid;
    height: 10px;
    width: 10px;
    transform: rotate(45deg);
    position: relative;
    top: 13px;
    left: 42px;
    border-right: none;
    border-top: none;
    background-color: white;
}

.aLittleRight {
    border: 1px solid;
    height: 10px;
    width: 10px;
    transform: rotate(45deg);
    position: relative;
    top: 13px;
    left: 46px;
    border-left: none;
    border-bottom: none;
    background-color: white;
}

a {
    text-decoration: none;
}

.button{

    width: 122PX;
}

.icons {
    height: auto;
    width: auto;
    float: left;
    position: relative !important;
    top: -35px !important;
    left: 8px !important;
}

.icons .el-button:hover {
    color: red;
}

.icons .el-button:focus {
    color: red;
}
</style>