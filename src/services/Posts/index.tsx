import * as React from 'react'
import { Component } from 'react'
import { ServiceContainer } from '@/src/libs'
import { scmConfig } from '@/config'

class PostsService extends Component<any> {
  static defaultValue = {
    // 初始化数据
    data: {
      title: 'undefined'
    },
    action: {
      changeUrl: () => {}
    }
  }

  changeUrl = () => {
    this.setState({
      data: {
        title: `change title`
      }
    })
  }

  state = Object.assign(
    {},
    PostsService.defaultValue,
    // 数据为准备情况下，交互可以先生效，方便拓展
    {
      action: {
        changeUrl: this.changeUrl
      }
    }
  )

  // Adatper 使用默认值，供 module 使用
  adapter = (value: any) => {
    console.log(value, 'adapter')
    this.setState({
      data: {
        title: value[0].score
      }
    })
  }

  render = () => {
    const { adapter, state } = this

    return (
      <ServiceContainer
        context={PostsContext}
        adapter={adapter}
        value={state}
        moduleConfig={this.props.moduleConfig}
        api={(() => {
          window['ghost'].init({
            clientId: scmConfig.ghost.id,
            clientSecret: scmConfig.ghost.secret
          })
          return window['ghost'].url.api(
            'posts'
          ).replace('https://fealight.cn', 'http://192.168.199.195:3000')
        })()}
      >
        {this.props.children}
      </ServiceContainer>
    )
  }
}

const PostsContext = React.createContext(PostsService.defaultValue)

export {
  PostsService,
  PostsContext
}
