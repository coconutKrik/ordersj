const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    allowedHosts: [
      'localhost',
      '127.0.0.1'    
    ],
    port:8080,
  },
})
