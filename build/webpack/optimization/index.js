export default {
  // 取代 new UglifyJsPlugin(/* ... */)
  minimize: true,
  providedExports: true,
  usedExports: true,
  // 识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
  // 依赖于optimization.providedExports和optimization.usedExports
  sideEffects: true,
  // 取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
  noEmitOnErrors: true,
  // 取代 new webpack.optimize.ModuleConcatenationPlugin()
  concatenateModules: true,
  splitChunks: {
    chunks: 'async',
    minSize: 30000, // 模块大于30k会被抽离到公共模块
    maxSize: 0,
    minChunks: 1, // 模块出现1次就会被抽离到公共模块
    maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
    maxInitialRequests: 3, // 入口模块最多只能加载3个
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      // default: {
      //   minChunks: 2,
      //   priority: -20,
      //   reuseExistingChunk: true
      // },
      // commons: {
      //   name: 'commons',
      //   chunks: 'initial',
      //   minChunks: 2
      // },
      vendor: {
        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        name: 'vendor',
        chunks: 'initial',
        minChunks: 2
      }
    }
  },
  runtimeChunk: {
    name: entrypoint => `runtime~${entrypoint.name}`
  }
}
