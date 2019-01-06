import * as React from 'react'
import {Component} from 'react'
import './index.scss'

interface TitleProps {
  title: string
}

export default class Title extends Component<TitleProps> {

  render () {
    return (
      <h1 className={'title'}>{this.props.title}</h1>
    )
  }
}
