import * as React from 'react'
import { Component } from 'react'
import axios from 'axios'

export interface ServiceContainerInterface {
  context: any,
  adapter: any,
  value: any,
  children: any,
  moduleConfig: object,
  api: string
}

export class ServiceContainer extends Component<ServiceContainerInterface> {
  static defaultProps = {
    context: React.createContext({}),
    adapter: () => {},
    value: {},
    moduleConfig: {},
    api: null
  }

  getService = () => {
    axios.get(this.props.api)
      .then((response) => {
        this.props.adapter(response.data)
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  componentDidMount = () => {
    this.getService()
  }

  render = () => {
    const { Provider } = this.props.context
    const { value } = this.props

    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    )
  }
}
