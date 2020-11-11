if (process.env.AQUARIA_CLIENT_EMIT_CNAME) {
  console.log(`Emit CNAME: ${process.env.AQUARIA_CLIENT_EMIT_CNAME}`);
}
module.exports = {
  chainWebpack: config => {
    config
      .module
      .rule("csv")
      .test(/\.csv$/)
      .use("csv-loader")
      .loader("csv-loader")
      .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      })
      .end();
    },
    publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/'
  }
