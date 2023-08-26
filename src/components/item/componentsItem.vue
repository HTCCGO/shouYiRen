<template>
    <div>
        <div class="index">
            <img src="" alt="" class="cle">
            <!-- 物品描述 -->
            <div class="userDescription">
                <p>{{ userdescription }}</p>
            </div>

            <div class="carousel" >
                <div class="block">
                    <el-carousel height="250px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small">{{ item }}</h3>
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
        }
    },
    methods: {
        getMessage() {

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