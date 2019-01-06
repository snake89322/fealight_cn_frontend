// import glob from 'glob'
import os from 'os'
import path from 'path'
import { argv } from 'yargs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import WebpackShellPlugin from 'webpack-shell-plugin-next'
import DashboardPlugin from 'webpack-dashboard/plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer'
import HappyPack from 'happypack'
// console.log(os.cpus().length, 6666666666666666)
function happypack ({ config }) {
  const happyThreadPool = HappyPack.ThreadPool({ size: 12 })
  config.plugins.push(new HappyPack({
    id: 'happypack-js',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          presets: [`@babel/env`, `@babel/react`],
          plugins: [
            `react-hot-loader/babel`,
            // 必须配置 legacy 参数
            // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators.html
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true
              }
            ],
            [
              `@babel/proposal-class-properties`,
              {
                loose: true
              }
            ],
            // 这个插件应该不用了，可以用作 webpackChunkname 混淆
            // `dynamic-import-webpack`,
            `@babel/syntax-dynamic-import`
          ],
          //
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          // -----------------------------------------------------------------------------
          cacheDirectory: true,
          babelrc: false
        }
      }
    ]
  }))
}

function cssChunks ({ config }) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: path.join(`css/[name].css?[contenthash:8]`),
      chunkFilename: path.join(`css/[name].chunk.css?[contenthash:8]`)
    })
  )
  config.plugins.push(new OptimizeCssAssetsPlugin())
}

function htmlChunks ({ entries, config }) {
  const _isProd = config.mode === `production`
  Object.keys(entries).forEach((name) => {
    // vendor 不输出
    if (name.includes(`vendor`)) return true

    const _htmlFields = entries[name][0].replace(`.tsx`, `.html`)

    // 每个页面生成一个html
    const plugin = new HtmlWebpackPlugin({
      // 生成出来的 html 文件名
      filename: name + (_isProd ? (argv.ext ? `.${argv.ext}` : `.html`) : `.html`),
      // 每个html的模版，这里多个页面使用同一个模版
      // template: glob.sync(htmlFields).length === 0 ? path.resolve(__dirname, `index.html`) : _htmlFields,
      template: _htmlFields.includes(`html`) ? _htmlFields : path.resolve(__dirname, `index.html`),
      // 自动将引用插入html
      inject: true,
      // 每个html引用的js模块，也可以在这里加上vendor等公用模块
      chunks: [name, `vendor`, `runtime~${name}`],
      // 自定义 option 在 html 中 使用 <%= htmlWebpackPlugin.options.external %> 调用
      // external: ["ex"]
      // 压缩
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 去除空格
        removeEmptyAttributes: true // 去除空属性
      }
    })
    config.plugins.push(plugin)
  })
}

function cleanDist ({ config }) {
  const _cwdname = process.cwd()

  const plugin = new CleanWebpackPlugin(path.resolve(_cwdname, `dist`),
    {
      //
      // Absolute path to your webpack root folder (paths appended to this)
      // Default: root of your package
      // -----------------------------------------------------------------------------
      root: path.resolve(_cwdname),
      //
      // Instead of removing whole path recursively,
      // remove all path`s content with exclusion of provided immediate children.
      // Good for not removing shared files from build directories.
      // -----------------------------------------------------------------------------
      exclude: [],
      //
      // Write logs to console.
      // -----------------------------------------------------------------------------
      verbose: false,
      //
      // Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      // -----------------------------------------------------------------------------
      dry: false,
      //
      // If true, remove files on recompile.
      // Default: false
      // -----------------------------------------------------------------------------
      watch: true
    }
  )
  config.plugins.push(plugin)
}

function hotModule ({ config }) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

function shellExcute ({ config, shell }) {
  config.plugins.push(new WebpackShellPlugin(shell))
}

function dashboard ({ config }) {
  config.plugins.push(new DashboardPlugin())
}

function bundleAnalyzer ({ config }) {
  config.plugins.push(new WebpackBundleAnalyzer.BundleAnalyzerPlugin())
}

export default {
  cssChunks,
  htmlChunks,
  cleanDist,
  hotModule,
  shellExcute,
  dashboard,
  bundleAnalyzer,
  happypack
}
