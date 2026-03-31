const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Patio Covers Vancouver | Fast Quote in 60 Seconds | Sunrooms | LoomiHome Patios',
    },
  },
})