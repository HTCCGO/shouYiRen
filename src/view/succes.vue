<template>
  <div>
    <el-result icon="success" title="成功提示" :subTitle="codeString">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="getHome()"
          >返回</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeString: "将在5秒后返回主页",
      codeNumber: 0,
      isTrigger: false,
      inval:null,
    };
  },
  mounted() {
    this.aa();
  },
  methods: {
    getHome() {
      this.$router.push("/home");
    },
    aa() {
      if (this.isTrigger) return;
      let n = 5;
      this.inval = setInterval(() => {
        if (n === 0) {
          this.isTrigger = false;
          this.$router.push("/home");
          clearInterval(this.inval);
        } else {
          this.isTrigger = true;
          this.codeString = `将在${n--}秒后返回主页`;
        }
      }, 1000);
    },
  },
  beforeDestroy() {
 clearInterval(this.inval); // 在组件销毁时清除轮询
}
};
</script>

<style>
</style>