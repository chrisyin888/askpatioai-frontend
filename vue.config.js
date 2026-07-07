const { defineConfig } = require('@vue/cli-service')
const seoVerification = require('./src/data/seoVerification.json')

module.exports = defineConfig({
  transpileDependencies: true,
  /** Root absolute paths so deep links (e.g. /patio-covers-vancouver) load /js/* and /css/* correctly on all hosts. */
  publicPath: '/',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Patio Cover Installation Vancouver | LoomiHome Patios',
      googleSiteVerification:
        process.env.VUE_APP_GOOGLE_SITE_VERIFICATION || seoVerification.googleSiteVerification || '',
      bingSiteVerification:
        process.env.VUE_APP_BING_SITE_VERIFICATION || seoVerification.bingSiteVerification || '',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
})