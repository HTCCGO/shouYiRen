<template>
    <div>
        <el-container>
            <el-header>
                <componentsHeaderVue />
            </el-header>
            <el-container class="main">
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

import componentsHeaderVue from '../../components/merchant/commponentsHeader.vue'
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
//导入完成该页面的相关组件

</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
}

.el-main {
    padding: 0px;
    overflow: hidden;
}

.el-footer {
    padding: 0;
}

.main {
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 70px;
}
</style>