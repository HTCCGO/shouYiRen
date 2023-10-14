<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue/></el-header>
            <el-container>
            <el-main><componentsMainVue/></el-main>
            </el-container>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>

import componentsHeaderVue from  '../../components/merchant/commponentsHeader.vue'
import componentsMainVue from '@/components/userinfo/componentsUserInfo.vue'
import componentsFooterVue from '../../components/componentsFooter.vue'

export default {
    data() {
        return {}
    },
    components:  {
    componentsHeaderVue,
    componentsMainVue,
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