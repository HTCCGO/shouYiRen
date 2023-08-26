<template>
    <div class="index">
         <!-- eslint-disable-next-line -->
        <div class="main" v-for="item in items" :key="items.id">
            <div style="display: flex;">
                <div class="aLittleLeft"></div>
                <div class="div">
                    <el-avatar size="small" :src="circleUrl"></el-avatar>
                </div>
                <div class="left_msg"><span>{{ item.left_msg }}</span></div>
            </div>
            <div style="display: flex; float: right; margin-right: 4px;">
                <div class="aLittleRight"></div>
                <div class="right_msg"><span>{{ item.right_msg }}</span></div>
                <div class="div"><el-avatar size="small" :src="circleUrl"></el-avatar></div>
            </div>
        </div>
        <div class="text">
            <div class="icons">
                <el-button type="text" @click="getDianZan"> <span class="iconfont icon-dianzan"></span></el-button>
                <el-button type="text" @click="tupian = true"> <span class="iconfont icon-tupian"></span></el-button>
                <el-button type="text" @click="zhifu = true"> <span class="iconfont icon-zhifu"></span></el-button>
                <el-button type="text" @click="updata = true"> <span
                        class="iconfont icon-shangchuandaochu"></span></el-button>
            </div>
            <textarea v-model="main_message.message"></textarea>
            <div>
                <el-button size="small" @click="getMessage()">发送</el-button>
                <el-button type="danger" size="small">取消</el-button>
            </div>
        </div>

        <el-dialog title="" :visible.sync="updata" direction="rtl" size="30%">
            <el-upload class="upload-demo" style="margin-left: 170px; margin-bottom: 40px;" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
           
            </el-upload>
            <el-button type="primary"  @click="updata = false" style="margin-left: 140px;">确 认</el-button>
            <el-button @click="updata= false" style="margin-left: 270px;">取 消</el-button>
        </el-dialog>

    </div>
</template>


<script>
export default {

    data() {
        return {
            updata: false,
            direction: 'rtl',
            main_message: {
                message: ""
            },
            items: [
                {
                    id: 1,
                    left_msg: "aaaa",
                    right_msg: "ssss",
                }

            ]
        }
    },
    methods:{
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            _
            done();
          })
          .catch(_ => {
            _
          });
      }
    }
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
    width: 800px;
    height: 480px;
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

.left_msg {
    border: 1px solid black;
    height: 20px;
    width: auto;
    margin-top: 3px;
    margin-left: 8px;
    padding: 5px;
    border-radius: 8px;
}

.right_msg {
    border: 1px solid black;
    margin-top: 3px;
    margin-right: 11px;
    height: 20px;
    width: auto;
    padding: 5px;
    border-radius: 8px;
}

.div {
    margin-top: 5px;
}

.aLittleLeft {
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