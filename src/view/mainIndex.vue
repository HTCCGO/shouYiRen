<template>
  <div>
    <el-container>
      <el-header> <component :is="headerComponent" /></el-header>
      <el-container
        ><el-main><componentsMainVue /></el-main>
      </el-container>
      <el-footer><componentsFooterVue /></el-footer>
    </el-container>
  </div>
</template>

<script>
import componentsHeaderVue from "../components/componentsHeader.vue";
import componentsMainVue from "../components/main/componentsMain.vue";
import componentsFooterVue from "../components/componentsFooter.vue";
import componentsHeaderVue_ from "../components/merchant/commponentsHeader.vue";

export default {
  data() {
    return {
      headerComponent: "",
    };
  },
  mounted() {
    this.header();
  },
  components: {
    componentsHeaderVue,
    componentsMainVue,
    componentsFooterVue,
    componentsHeaderVue_, // Fixed typo in the component name
  },
  methods: {
    header() {
      const user = this.$store.state.user;

      if (user) {
        this.headerComponent = "componentsHeaderVue";
      } else {
        this.headerComponent = "componentsHeaderVue_";
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