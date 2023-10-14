<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue/></el-header>
            <el-main><componentsItemVue/></el-main>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>

import componentsFooterVue from '@/components/componentsFooter.vue'
import componentsHeaderVue from '@/components/componentsHeader.vue'
import componentsItemVue from '@/components/item/componentsItem.vue'

export default{
    data(){
        return{}
    },
    components:{
        componentsFooterVue,
        componentsHeaderVue,
        componentsItemVue,
    }
}
</script>

<style lang="less" scoped>
.componentsItemVue{
    margin-top: 20px;
}

.el-footer{
    padding: 0;
}
</style>