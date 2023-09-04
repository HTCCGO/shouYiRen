<template>
    <div>
        <el-container>
            <el-header><componentsHeaderVue/></el-header>
            <el-container>
                <el-aside width="200px"><componentsAsideVue/></el-aside>
                <el-main><componentsMainVue/></el-main>
                <el-footer><componentsFooterVue/></el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import componentsFooterVue from '../components/componentsFooter.vue'
import componentsHeaderVue from '../components/componentsHeader.vue'
import componentsAsideVue from '../components/userinfo/componentsAside.vue'

export default{
    data(){
        return {}
    },
    components:{
        componentsFooterVue,
        componentsHeaderVue,
        componentsAsideVue,

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

.el-main{
    padding: 0;
    margin: 0;
}
</style>