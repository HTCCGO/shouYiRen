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
            <div class="icons">
                <el-button type="text" @click="tupian = true"> <span class="iconfont icon-tupian"></span></el-button>
                <el-button type="text" @click="zhifu = true"> <span class="iconfont icon-zhifu" @click="getZhiFu()"></span></el-button>
                <el-button type="text" @click="updata = true"> <span class="iconfont icon-shangchuandaochu"></span></el-button>
            </div>
            <textarea v-model="newMessage" @keyup.enter.native="getMessage()"></textarea>
            <div>
                <el-button size="small" @click="getMessage()">发送</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
        </div>

        <el-dialog title="" :visible.sync="updata" direction="rtl" size="30%">
            <el-upload class="upload-demo" style="margin-left: 170px; margin-bottom: 40px;" drag
                action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <el-button type="primary" @click="updata = false" style="margin-left: 140px;">确 认</el-button>
            <el-button @click="updata = false" style="margin-left: 270px;">取 消</el-button>
        </el-dialog>

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
    this.connectWebSocket(); // 连接WebSocket服务器
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
                this.message=req.data;
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    _
                    done();
                })
                .catch(_ => {
                    _
                });
        },
        getZhiFu(){
            //转移到支付界面
            this.$router.push('/pay');
        },
        connectWebSocket(){
            //新建一个WebSocket连接
            this.socket = new WebSocket('ws://localhost:3001/pay');
            this.socket.addEventListener("open", () => {
                console.log("WebSocket连接已打开");
                //连接的时候发送对应的
                this.socket.send("Hello Server!");
            });
             this.socket.addEventListener("message", (event) => {
                console.log("接收到消息:", event.data);
                //将新增的data数据新增到数据最后。
                this.message.push(event.data);
            });
            this.socket.addEventListener("error", (error) => {
                console.log("WebSocket连接出错:", error);
            });
        },
        //关闭socket连接
        closeWebSocket(){
            this.socket.addEventListener("close", () => {
            console.log("WebSocket连接已关闭");
            this.socket=null;
            this.$router.push("/home");
            });
        },
        
    },
    beforeDestroy(){
        this.closeWebSocket();
    },
};
</script>

<style lang="less" scoped>
.index {
    border-radius: 15px;
    width: 800px;
    margin: 20px;
    box-shadow: 0 0 15px #cac6c6;
}

.main {
    border: 1px solid #eaeaea;
    border-bottom: none;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    max-width: 800px;
    height: 480px;
    overflow: auto;
    overflow-x: hidden;
}

.text {
    border: 1px solid #eaeaea;
    border-top: 1px solid #464545;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    width: 800px;
    height: 90px;

    textarea {
        border: 0;
        outline: none;
        resize: none;
        width: 493px;
        height: 75px;
        padding-left: 8px;
        overflow: hidden; //消除滚动条
        font-family: 'Hiragino Sans GB';
        font-size: 18px;
        position: relative;
        left: -100px;
    }

    div {
        position: relative;
        top: -40px;
        left: 665px;
    }
}

/* Add the closing curly brace here */
.user_1 {
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

.el-button {
    color: black;
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