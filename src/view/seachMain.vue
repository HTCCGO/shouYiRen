<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue/></el-header>
            <el-main><mainIndexVue/></el-main>
            <el-footer><componentsFooterVue/></el-footer>
        </el-container>
    </div>
</template>

<script>
import componentsFooterVue from '@/components/componentsFooter.vue'
import componentsHeaderVue from '@/components/componentsHeader.vue'
import mainIndexVue from '@/components/commponentsSeach.vue'
        export default{
            data(){

            },
            components:{
                componentsHeaderVue,
                componentsFooterVue,
                mainIndexVue
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