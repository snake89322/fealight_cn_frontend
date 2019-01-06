// base
import * as React from 'react'
import { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
// i18n
import { injectIntl } from 'react-intl'

// bury
// import { setBury } from '@/src/libs'
// import { BuryHeaderComponentDidMount } from '@/src/bury'

// service
// const setContext = require('@/src/libs').setContext
// import { PostsContext } from '@/src/services'

// styles
import './index.scss'

// @setContext('PostsContext', PostsContext)
class Home extends Component<any, any> {
  constructor (props: any) {
    super(props)
  }

  // @setBury({}, BuryHeaderComponentDidMount)
  componentDidMount () {
    
  }

  render () {
    return (
      <Fragment />
    )
  }
}

export default injectIntl(Home)
