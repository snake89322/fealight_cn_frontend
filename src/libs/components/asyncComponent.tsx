import * as React from 'react'
import { Component, Suspense } from 'react'

export function asyncComponent (importComponent: any, config: object) {
  const LazyComponent = React.lazy(importComponent)

  class AsyncComponent extends Component {
    render () {
      return (
        <Suspense fallback={null}>
          <LazyComponent {...this.props} {...config} />
        </Suspense>
      )
    }
  }

  return AsyncComponent
}
