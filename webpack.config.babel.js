import { argv } from 'yargs'
import * as webpackConfig from './build/webpack'
import { buildConfig } from './config'

const config = {}
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isAnalyzer = process.env.analyzer

const PROJECT = (argv.project && argv.project.length > 0) ? argv.project : null
const FILES = (argv.files && argv.files.length > 0) ? argv.files : buildConfig.webpack.entryFiles

const entries = webpackConfig.entry({
  fields: buildConfig.webpack.entryFields,
  project: PROJECT,
  files: FILES,
  isDev,
  context: buildConfig.context
})

console.log(`入口文件: \n`, entries)

// mode
config.mode = process.env.NODE_ENV || argv.env || `production`

// entry
config.entry = entries

// output
config.output = {
  path: buildConfig.webpack.outputPath,
  filename: isProd ? buildConfig.webpack.prod.outputFilename : buildConfig.webpack.dev.outputFilename,
  publicPath: isProd ? buildConfig.webpack.prod.outputPublicPath : buildConfig.webpack.dev.outputPublicPath
}

// module
config.module = webpackConfig.module

// plugins
config.plugins = []
if (isProd) {
  webpackConfig.plugins.cssChunks({ config })
  webpackConfig.plugins.cleanDist({ config })
}
if (isDev) {
  webpackConfig.plugins.hotModule({ config })
  // webpackConfig.plugins.dashboard({ config })
}
if (isAnalyzer) {
  webpackConfig.plugins.bundleAnalyzer({ config })
}
webpackConfig.plugins.htmlChunks({ config, entries })
webpackConfig.plugins.shellExcute({ config, shell: buildConfig.webpack.shell })
// webpackConfig.plugins.happypack({ config })

// optimization
if (isProd) {
  config.optimization = webpackConfig.optimization
}

// bail
// Don't attempt to continue if there are any errors.
config.bail = !isDev

// cache
config.cache = isDev

// devtool
config.devtool = isProd ? buildConfig.webpack.prod.sourceMap : buildConfig.webpack.dev.sourceMap

// devServer
config.devServer = {
  contentBase: buildConfig.webpack.outputPath,
  port: buildConfig.context.port,
  host: buildConfig.context.host,
  openPage: PROJECT,
  open: true,
  inline: true,
  hot: true,
  overlay: {
    warnings: true,
    errors: true
  },
  clientLogLevel: `warning`,
  noInfo: true,
  proxy: buildConfig.webpack.devServer.proxy
}

// resolve
config.resolve = buildConfig.webpack.resolve

export default config
