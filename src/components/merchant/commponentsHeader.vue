<template>
    <div class="header">
        <div class="header_left"><el-button size="medium " round @click="getHome()">首页</el-button></div>
        <div class="header_medium"><el-input @keyup.enter.native="toSearch()" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="seach_txt"/> </div>
        <div class="header_right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img class="el-icon-arrow-down el-icon--right" style=" background-color: black;">
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item  @click.native="getUserInfo()">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="getUserMessage()">我的消息</el-dropdown-item>
                    <el-dropdown-item @click.native="getUserHistory()">历史记录</el-dropdown-item>
                    <el-dropdown-item @click.native="resetUserInfo()">修改信息</el-dropdown-item>
                    <el-dropdown-item @click.native="upDataNewItem()">上传物品</el-dropdown-item>
                    <el-dropdown-item @click.native="quitUser()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            seach_txt:""
        }
    }, 
    methods: {
        getUserInfo() {
            this.$router.push('/merchant/userInfo')
        },
        getUserMessage(){
            this.$router.push('/merchant/userMessage');
        },
        getUserHistory(){
            this.$router.push('/merchant/userHistory');
        },
        quitUser(){
            this.$cookie.remove("token");
            this.$router.push('/login');
        },
        resetUserInfo(){
            this.$router.push('/merchant/resetUserInfo');
        },
        getHome(){
            this.$router.push('/home');
        },
        upDataNewItem(){
            this.$router.push('/upDataItem');
        },
        toSearch(){
           this.$$store.commit('getSeachCard', this.seach_txt);
           this.$router.push('/search');
        }
    },
};
 
</script>

<style lang="less">
.header {
    padding-top: 10px;
    border-bottom: 1px solid #eaeaea;
    background-color: #fff;
    height: 60px;
    // margin-top: 2px;
    // margin-left: 3px;
    // margin-right: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header_left {
    width: 50px;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    margin-left: 20px;
}

.header_medium {
    width: 450px;
    padding: 0;
}

.header_right {
    width: 10px;
    margin-right: 37px;
}

.el-icon-arrow-down {
    height: 30px;
    width: 30px;
    border-radius: 50%;
}
</style>