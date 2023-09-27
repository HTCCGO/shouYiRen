<template>
    <div>
        <el-container style="min-height: 100vh;">
            <el-header><componentsHeaderVue/></el-header>
            <el-main><componentsUserHistoryVue/></el-main>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>
import componentsHeaderVue from  '../../components/merchant/commponentsHeader.vue'
import componentsUserHistoryVue from '../../components/userinfo/componentsUserHistory.vue'
import componentsFooterVue from '../../components/componentsFooter.vue'

export default {
    data() {
        return {}
    },

    components:  {
    componentsHeaderVue,
    componentsUserHistoryVue,
    componentsFooterVue
}
};
//导入完成该页面的相关组件

</script>

<style lang="less" scoped>
.el-header{
    padding: 0;
}
.el-footer{
    padding: 0;
}
</style>