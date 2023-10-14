<template>
    <div>
        <div class="index">
            <img :src="userImg" alt="" class="cle">
            <!-- 物品描述 -->
            <div class="userDescription">
                <p>{{ userdescription }}</p>
            </div>

            <div class="carousel" >
                <div class="block">
                    <el-carousel height="250px">
                        <el-carousel-item v-for="item in 4" :key="item">
                           <img :src="item.src">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <div class="itemDescription">
                <p  align="left">{{ itemdescription }}</p>
            </div>
                    <div style="margin-top: 15px;">
                        <el-button  @click="getUserItem()" class="now" type="primary">立即沟通</el-button>
                    </div>
                    <div>
                        <el-button @click="getPay()" class="buy" type="primary">立即购买</el-button>
                    </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            userdescription: "ZZZZZAASAS",
            itemdescription: "ASDFDASDAS",
            userImg:"",
            item:[
                {id:1,src:""},
                {id:1,src:""},
                {id:1,src:""},
                {id:1,src:""},
                {id:1,src:""},
            ],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {

        getMessage() {
            this.$router.push('')
        },
        getData(){
            const Id={
                itemId:this.$store.state.ItemId,
            }
            this.$http.post("/api/userItem/getData",Id).then(req=>{
                this.userdescription=req.data.data.userdescription;
                this.itemdescription=req.data.data.itemdescription;
            }).catch(err=>{
                console.log(err);
            })
        },
        getUserItem(){
            //转移到userMessage页面
            this.$router.push ('/userMessage');
        },
        getPay(){
            this.$router.push('/pay');
        },
    }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.index {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 800px;
    border-radius: 15px;
    border: 1px solid #eaeaea;
    padding: 10px;
    box-shadow: 0 0 15px #cac6c6;
}

.cle {
    height: 200px;
    width: 130px;
    // border: 1px solid #838485;
    margin-bottom: 10px;
    border-radius: 7px;
}

.userDescription {
    float: right;
    height: 200px;
    width: 660px;
    border: 1px solid #838485;
    border-radius: 7px;
}

.itemDescription {
    margin-top: 5px;
    width: auto;
    height: 150px;
    border: 0.5px solid #838485;
    border-radius: 7px;
}


.button {
    height: 40px;
    width: 110px;
    margin: auto;
    background-color: #409eff;
    margin-top: 8px;
    border-radius: 10px;
}

.carousel{
    margin-bottom: 10px;
}
.now{
    float: left;
    margin-left: 200px;
}

.buy{
margin-left: 200px;
}

p{
    float: left;
    margin-top: 4px;
    margin-left: 5px;
    font-family:  "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 17px;
}
</style>