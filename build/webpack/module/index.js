import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import PostcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import PostcssPresetEnv from 'postcss-preset-env'
const isProd = process.env.NODE_ENV === 'production'

// const preRule = {
//   enforce: `pre`,
//   test: /\.js$/,
//   loader: `source-map-loader`
// }

const jsRule = {
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: `babel-loader`,
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
}

const tsRules = {
  test: /\.(j|t)sx?$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'awesome-typescript-loader'
    }
  ]
}

const cssRule = {
  test: /\.css$/,
  use: [
    isProd ? MiniCssExtractPlugin.loader : `style-loader`,
    `css-loader`
  ]
}

const sassRule = {
  test: /\.scss$/,
  use: [
    isProd ? MiniCssExtractPlugin.loader : `style-loader`,
    {
      loader: `css-loader`,
      options: {
        modules: true,
        localIdentName: `[path][name]__[local]--[hash:base64:8]`
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          PostcssFlexbugsFixes,
          PostcssPresetEnv({
            autoprefixer: {
              flexbox: `no-2009`
            },
            stage: 3
          })
        ]
      }
    },
    { loader: `sass-loader` }
  ],
  exclude: /node_modules/
}

// https://webpack.js.org/configuration/module/#module-contexts
export default {
  // wrappedContextCritical: false,
  // exprContextCritical: false,
  // wrappedContextRecursive: false,
  rules: [
    // preRule,
    tsRules,
    // jsRule,
    cssRule,
    sassRule
  ]
}
