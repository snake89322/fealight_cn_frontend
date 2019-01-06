import glob from 'glob'

/**
 * webpack entry 多文件处理
 *
 * @export
 * @param {String} fields 入口的域
 * @param {String} files 入口的通配 js
 * @param {Boolean} isDev 是否为开发模式
 * @param {Object} context webpack config 上下文
 * @param {String} project 指定的项目路径
 * @returns
 */
export default function ({ fields, files, isDev, context, project }) {
  const _files = glob.sync(`${fields}${files}`)
  const entries = {}

  const _componentRe = new RegExp(String.raw`component[s]?/`, `i`)
  const _privateRe = new RegExp(String.raw`_`)
  const _projectRe = new RegExp(String.raw`${project}`)
  const _routesRe = new RegExp(String.raw`routes`)
  const _pagesRe = new RegExp(String.raw`pages`)

  _files.forEach((filepath) => {
    let _name = filepath.split(`.tsx`)[0]

    //
    // 使用正则过滤 component(s)/ 组件文件夹
    // 使用正则过滤 _ 开头的私有文件（夹）
    // 使用正则过滤 非 project 开头的项目文件
    // -----------------------------------------------------------------------------
    if (
      _componentRe.test(_name) ||
      _privateRe.test(_name) ||
      _routesRe.test(_name) ||
      _pagesRe.test(_name) ||
      (project && project.length > 0 && !_projectRe.test(_name))
    ) return
    //
    // 使用正则实现 replace all 效果
    // -----------------------------------------------------------------------------
    let _module = _name.replace(new RegExp(fields, `g`), ``)
    entries[ _module ] = [
      filepath
      // `webpack-hot-middleware/client?path=http://${context.host}:${context.port}/__webpack_hmr`
    ]

    // if (!isDev) {
    //   entries[ _module ].pop()
    // }
  })

  return entries
}
