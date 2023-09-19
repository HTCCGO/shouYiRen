<template>
      <el-result icon="error" title="错误提示" subTitle="请重新修改信息">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="getResut()">返回</el-button>
      </template>
    </el-result>
</template>

<script>
export default{
  methods:{
    getResut(){
        //返回修改页面
      this.$router.push('/resetUserInfo')
},
  }}
</script>

<style>
</style>