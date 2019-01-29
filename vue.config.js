module.exports = {
  devServer: {
    hot:true,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:8090',
        pathRewrite:{
          '/api':''
        }
        //secure:false,
        //changeOrigin:true,
        //protocolRewrite: 'https'
        //https: true,
      },
      '/api': {
        target: 'http://localhost:9500',
        pathRewrite:{
          '/api':''
        }
        //secure:false,
        //changeOrigin:true,
        //protocolRewrite: 'https'
        //https: true,
      }
    }
  }
}