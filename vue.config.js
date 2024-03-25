// const version = newData().getTime()

module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
      faviconSVG: 'favicon.ico'
    }
  },
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  configureWebpack: {
    // webpack 配置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${new Date().getTime()}.js`,
      chunkFilename: `static/js/[name].${new Date().getTime()}.js`
    }
  },
  devServer: {
    //disableHostCheck: false,
    /*proxy: {
        '/rng': {     
            target: '',  
            ws: true,       
            secure: false,   
            changeOrigin: true,
            pathRewrite:{
                '^/rng':''
            }
        }
    }*/
  }
  // filenameHashing: false,
  // 打包的时候不使用 hash 值，因为后面自行添加时间戳或者版本号了
  // css: {
  //   extract: {
  //     filename: `css/[name].${version}.css`,
  //     chunkFilename: `css/[name].${version}.css`
  //   }
  // },
  // configureWebpack: {
  //   output: {
  //     filename: `js/[name].${version}.js`,
  //     chunkFilename: `js/[name].${version}.js`
  //   }
  // }
};
