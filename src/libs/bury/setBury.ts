interface BuryInterface {
  config: object,
  callback: any
}

const getBury: any = (buryObject: BuryInterface) => (target: any, name: string, descriptor: any) => ({
  get () {
    const _componentContext = this
    return function (this: any) {
      const {config, callback } = buryObject
      callback.apply(_componentContext, [...arguments, config])
      descriptor.value.apply(_componentContext, arguments)
      
      // 以下方法备用
      // if (descriptor.initializer === void 0) {
      //   callback.apply(this, [...arguments, config]) 
      //   descriptor.value.apply(_componentContext, arguments)
      // } else {
      //   callback.apply(_componentContext, [...arguments, config])
      //   descriptor.initializer.call(_componentContext).apply(_componentContext, arguments)
      // }
    }
  },
  set () {}
})

export const setBury: any = (config: object, callback: void) => {
  return getBury({
    config,
    callback
  })
}
