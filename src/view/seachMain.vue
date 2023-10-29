<template>
  <div>
    <el-container>
      <el-header> <component :is="headerComponent" /></el-header>
      <el-container>
        <el-main><mainIndexVue /></el-main>
      </el-container>
      <el-footer><componentsFooterVue /></el-footer>
    </el-container>
  </div>
</template>

<script>
import componentsFooterVue from "@/components/componentsFooter.vue";
import componentsHeaderVue from "@/components/componentsHeader.vue";
import mainIndexVue from "@/components/commponentsSeach.vue";
import componentsHeaderVue_ from "@/components/merchant/commponentsHeader.vue";
export default {
  data() {
    return{
      headerComponent:"",
    }
  },
  components: {
    componentsHeaderVue,
    componentsFooterVue,
    mainIndexVue,
    componentsHeaderVue_,
  },
  mounted(){
    this.header();
  },
  methods: {
    header() {
      const user = this.$store.state.user;
      if (user) {
        this.headerComponent= "componentsHeaderVue";
      } else {
        this.headerComponent= "componentsHeaderVue_";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-footer {
  padding: 0;
}
</style>