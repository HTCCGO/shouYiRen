<template>
    <div>
        <el-result icon="success" title="成功提示" subTitle="返回主页">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="getHome()">返回</el-button>
      </template>
    </el-result>
    </div>
</template>

<script>
    export default {
        methods:{
            getHome(){
                this.$router.push('/home');
    },
    }
}
</script>

<style> 
</style>