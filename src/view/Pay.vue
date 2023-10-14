<template>
  <div>
    <iframe
      :srcdoc="htmlContent"
      width="1488"
      height="700"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: null,
      success: false,
      socket: null,
      htmlContent: null,
      timerId: null, // 添加这行
    };
  },

  created() {
    this.createQrcode();
  },

  methods: {
    // 生成二维码
    async createQrcode() {
      const fromData = {
        userId: this.$store.state.payUserId,
        itemId: this.$store.state.payItemId,
      };
      
      await this.$http
        .post("/api/pay", fromData)
        .then((res) => {
          this.htmlContent = res.data.data.link;
          this.timerId = setInterval(() => {
            this.payRequestParams(res.data.data.outTradeNo);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    payRequestParams(outTradeNo) {
      this.$http
        .post("/api/pay/requestParams",outTradeNo)
        .then(res=> {
          console.log(res);
          if (res.data.data) {
            this.$store.commit("setRouter", "/pay");
            this.$router.push("/succes");
            clearInterval(this.timerId); // 在这里清除定时器
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.timerId); // 在组件销毁前清除定时器
  },
};
</script>

<style>
#qrcode {
  width: 150px;
  height: 150px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 50px;
  display: block;
}
.main {
  width: 550px;
  height: 400px;
  margin: auto;
  margin-top: 150px;
  padding: 0;
}
p {
  text-align: center;
}
iframe {
  margin: auto;
}
</style>