/**
 * @method
 * @param {Type} data 目标对象
 * @returns {Type} 运营商名称
 * @desc 根据目标对象获取运营商
 */

interface DiffConfig {
  data: object,
  html: object,
  js: object,
  css: object
}

interface ApiConfig {
  locals: Array<string>,
  api: any
}

export const getDiffConfig = (local: string, diffConfig: DiffConfig) => {
  function getDiff (diffObj: object) {
    if (Object.keys(diffObj).length === 0) {
      return
    }
    
    let result = {}
    for (let i in diffObj) {
      if (Array.isArray(diffObj[i])) {
        result[i] = []
        diffObj[i].forEach((item: ApiConfig) => {
          if (item.locals.indexOf(local) > -1) {
            result[i].push(item.api)
          }
        })
      } else {
        if (diffObj[i].locals.indexOf(local) > -1) {
          result[i] = diffObj[i].api
        }
      }
    }
    return result
  }

  return {
    data: getDiff(diffConfig.data),
    html: getDiff(diffConfig.html),
    js: getDiff(diffConfig.js),
    css: getDiff(diffConfig.css)
  }
}
