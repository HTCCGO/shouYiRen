const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports={
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 替换掉请求中的 /api
        }
      }
    }
  }
}