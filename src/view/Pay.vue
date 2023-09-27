<template>
    <div>
        <div class="main">
            <div id="qrcode" ref="qrcode"></div>
            <p>请用手机微信扫描该二维码</p>
        </div>
        <el-button @click="message()"> ZZ</el-button>
    </div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      link: "你好",
      success: false,
      socket: null,
      qrCodeInstance: null,
    };
  },

  //created在实例创建后被调用，dom没有渲染完全
  created() {
    this.createQrcode(); // 先生成二维码
   
  },

  mounted() {
    this.payOrder(); // 把信息写入二维码 
    this.connectWebSocket(); // 连接WebSocket服务器
  },

  methods: {
    // 把信息写入二维码
    payOrder() {
      this.$nextTick(() => {
        this.createQrcode();
      });
    },

    // 生成二维码
    createQrcode() {
      this.qrCodeInstance = new QRCode("qrcode", {
        width: 150, // 宽度
        height: 150, // 高度
        text: this.link, // 二维码内容
        render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      });
    },

    connectWebSocket() {
      this.socket = new WebSocket('ws://localhost:3001');
      this.socket.addEventListener("open", () => {
        console.log("WebSocket连接已打开");
        this.socket.send("Hello Server!");
      });

      this.socket.addEventListener("message", (event) => {
        console.log("接收到消息:", event.data);
      });

      this.socket.addEventListener("close", () => {
        console.log("WebSocket连接已关闭");
        this.$router.push("/home");
      });

      this.socket.addEventListener("error", (error) => {
        console.log("WebSocket连接出错:", error);
      });
    },

    sendMessage() {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send("hello");
      }
    },
  },
};
</script>

<style>
#qrcode{
    width: 150px;
    height: 150px;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 50px;
    display: block;
}
.main{
    width: 550px;
    height: 400px;
    margin: auto;
    margin-top: 150px;
    padding: 0;
}
p{
    text-align: center;
}
</style>