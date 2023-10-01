<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue :is="header" /></el-header>
            <el-main><componentsMainVue/></el-main>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>
import componentsHeaderVue from '../components/componentsHeader.vue'
import componentsMainVue from '../components/main/componentsMain.vue'
import componentsFooterVue from '../components/componentsFooter.vue'
import componentsHeaderVue_ from '../components/merchant/commponentsHeader.vue'

export default {
  data() {
    return {}
  },
  components: {
    componentsHeaderVue,
    componentsMainVue,
    componentsFooterVue,
    componentsHeaderVue_, // Fixed typo in the component name
  },
  computed: {
    header() {
    const user=this.$store.state.user;
     if(user){
        return "componentsHeaderVue";
     }else{
        return "componentsHeaderVue_";
     }
    }
  }
}
</script>

<style lang="less" scoped>
.el-header{
    padding: 0;
}
.el-footer{
    padding: 0;
}
</style>