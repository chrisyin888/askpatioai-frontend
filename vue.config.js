const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pages: {
    index: {
      title: 'Patio Covers & Sunrooms — Free Estimate',
    },
  },
})
