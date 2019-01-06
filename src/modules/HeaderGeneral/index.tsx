import * as React from 'react'
import { Component } from 'react'
// import * as PropTypes from 'prop-types'
import * as styles from './index.scss'
import 'normalize.css'
import { injectIntl } from 'react-intl'

import { diffDom, getDiffConfig } from '@/src/libs'
import { diffConfig } from './diff'

import { Title } from '@/src/components'

// bury
import { setBury } from '@/src/libs'
import { BuryHeaderComponentDidMount } from '@/src/bury'

// service
const setContext = require('@/src/libs').setContext
// import { setContext } from '@/src/libs'
import { PostsContext } from '@/src/services'

// import './index.scss'

interface DiffConfig {
  [key: string]: any
}

interface HeaderProps {
  local: string,
  UserIndexContext?: any,
  intl: any
}

interface HeaderState {
  diff: DiffConfig
}

@setContext('UserIndexContext', PostsContext)
class HeaderGeneral extends Component<HeaderProps, HeaderState> {
  constructor (props: HeaderProps) {
    super(props)
    const diff = getDiffConfig(this.props.local, diffConfig)
    this.state = {
      diff: diff
    }
    console.log(diff)

    this.handleClickOnBtn = this.handleClickOnBtn.bind(this)
  }

  @setBury({}, BuryHeaderComponentDidMount)
  handleClickOnBtn (this: any, e: any) {
    console.log(this)
    // let diff = this.state.diff
    // diff.js.defFn1 && diff.js.defFn1()
    // diff.js.testFn1 && diff.js.testFn1()
    // diff.js.testFn2 && diff.js.testFn2()
  }

  // @setBury({}, BuryHeaderComponentDidMount)
  componentDidMount () {
    console.log(styles, 'css module')
  }

  render () {
    const diff = this.state.diff
    // const { formatMessage } = this.props.intl
    return (
      <section className={'header-general'}>
        <Title title={diff.data.titleText} />
        {
          diffDom(diff.html.diffTitle) ||
          <h2 onClick={this.handleClickOnBtn}>this default Title</h2>
        }
        <h1>{this.props.UserIndexContext.data.title}</h1>
      </section>
    )
  }
}
export default injectIntl(HeaderGeneral)
