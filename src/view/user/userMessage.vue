<template>
    <div>
        <el-container>
            <el-header>
                <componentsHeaderVue />
            </el-header>
            <el-container>
                <el-aside>
                    <componentsUserMessageVue />
                </el-aside>
                <el-main>
                    <componentsUserMessageMain />
                </el-main>
            </el-container>
            <el-footer>
                <componentsFooterVue />
            </el-footer>
        </el-container>
    </div>
</template>

<script>

import componentsHeaderVue from '../../components/componentsHeader.vue'
import componentsUserMessageMain from '../../components/userMessage/componentsMain.vue'
import componentsFooterVue from '../../components/componentsFooter.vue'
import componentsUserMessageVue from '../../components/userMessage/componentsConcat.vue'

export default {
    data() {
        return {}
    },
    components: {
        componentsHeaderVue,
        componentsUserMessageMain,
        componentsFooterVue,
        componentsUserMessageVue,
    }
};
</script>

<style lang="less" scoped>

.el-header{
    padding: 0;
}

.el-main{
padding: 0;
max-width: 1000px;
overflow: hidden; //消除滚动条
}

.el-footer{
    padding: 0;
}

</style>