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
                <p>{{ itemdescription }}</p>
            </div>
            <div class="button" @click="getMessage">
                <a href="">
                    <div>
                        <span style=" ">立即沟通</span>
                    </div>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            userdescription: "",
            itemdescription: "",
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
        //TODO完成一个两方进行相互交流的页面
        getMessage() {
            this.$router.push('')
        },
        getData(){
            const Id={
                itemId:this.$store.state.ItemId,
                userId:this.$store.state.userId,
            }
            this.$http.post("/userItem/getData",Id).then(req=>{
                this.userdescription=req.data.data.userdescription;
                this.itemdescription=req.data.data.itemdescription;
            });
        }
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

a {
    text-decoration: none;
    color: white;
}
a:hover{
    color: black;
}

.button {
    height: 40px;
    width: 110px;
    margin: auto;
    background-color: #409eff;
    margin-top: 8px;
    border-radius: 10px;
}
span{
    position: relative;
    top: 8px;
    left: 22px;
}
.carousel{
    margin-bottom: 10px;
}
</style>