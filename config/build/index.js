import os from 'os'
import path from 'path'

// 本机 host
const host = (() => {
  const interfaces = os.networkInterfaces()
  let _host = ``

  for (let dev in interfaces) {
    interfaces[dev].forEach((alias) => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        _host = alias.address
        return false
      }
    })
  }

  return _host
})()
// 开发机端口
const port = `3000`

export default {
  webpack: {
    // 编译入口目录
    entryFields: `./src/views/`,
    // 入口通配js
    entryFiles: `**/*.tsx`,
    // 生产目录
    outputPath: path.resolve(`./dist`),
    prod: {
      // 生产模式 publicPath
      outputPublicPath: `/`,
      // 生产模式 filename
      outputFilename: `js/[name].js?[chunkhash:8]`,
      chunkFilename: 'js/[name].chunk.js?[chunkhash:8]',
      // 生产模式 sourceMap
      sourceMap: false
    },
    dev: {
      // 开发模式 publicPath
      outputPublicPath: `http://${host}:${port}/`,
      // outputPublicPath: `/`,
      // 开发模式 filename
      outputFilename: `js/[name].js?[hash:8]`,
      // 开发模式 sourceMap
      sourceMap: `source-map`
    },
    resolve: {
      alias: {
        '@/src': path.resolve(__dirname, `../../src`),
        '@/config': path.resolve(__dirname, `../../config`),
        '@/scm': path.resolve(__dirname, `../../scm/scm.config`)
      },
      extensions: [`.js`, `.json`, `.ts`, `.tsx`]
    },
    devServer: {
      proxy: {
        '/ghost/**/*': {
          target: `https://fealight.cn`,
          changeOrigin: true,
          secure: false
        }
      }
    },
    // webpack 嵌入 shell 执行配置
    shell: {
      onBuildStart: {
        scripts: [`echo 编译开始`],
        blocking: true,
        parallel: false
      },
      onBuildEnd: {
        scripts: [`echo 编译结束`],
        blocking: true,
        parallel: false
      },
      onBuildExit: {
        scripts: [`echo 编译退出`],
        blocking: true,
        parallel: false
      }
    }
  },
  context: {
    host,
    port
  }
}
