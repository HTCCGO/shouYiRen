<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue/></el-header>  
             <el-Aside><componentsAside/></el-Aside>
            <el-main><componentsUserInfoVue/></el-main>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>

import componentsHeaderVue from '../../components/componentsHeader.vue'
import componentsFooterVue from '../../components/componentsFooter.vue'
import componentsUserInfoVue from '@/components/userinfo/componentsUserInfo.vue'
import componentsAside from '@/components/userinfo/componentsAside.vue'

export default {
    data() {
        return {}
    },
    components:  {
    componentsHeaderVue,
    componentsUserInfoVue,
    componentsFooterVue,
    componentsAside,
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
