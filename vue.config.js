const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  /** Root absolute paths so deep links (e.g. /patio-covers-vancouver) load /js/* and /css/* correctly on all hosts. */
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Patio Cover Contractors Vancouver BC | Installers Near Me | LoomiHome Patios',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
})