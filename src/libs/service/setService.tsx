import * as React from 'react'
import { ComponentType, Component } from 'react'

export const setService = (Service: ComponentType<any>, moduleConfig: object) => (WrappedComponent: ComponentType) => {
  return class extends Component {
    render = () => (
      <Service moduleConfig={moduleConfig}>
        <WrappedComponent {...this.props} />
      </Service>
    )
  }
}
