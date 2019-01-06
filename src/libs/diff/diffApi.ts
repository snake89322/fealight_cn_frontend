export function diffJs (fn: (...arg: any) => {}, ...arg: any): any {
  if (fn) {
    return fn(...arg)
  }
}

export function diffCss (...className: Array<string>)  {
  if (className.length > 0) {
    return className.join(' ')
  } else {
    return ''
  }
}

export function diffDom (Dom: (...props: any) => {}, props?: any): any {
  if (Dom) {
    return Dom(props)
  } else {
    return null
  }
}
