// base
import * as React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
// i18n
import { injectIntl } from 'react-intl'

// bury
// import { setBury } from '@/src/libs'
// import { BuryHeaderComponentDidMount } from '@/src/bury'

// service
// const setContext = require('@/src/libs').setContext
// import { PostsContext } from '@/src/services'

// styles
import * as styles from './index.scss'

// @setContext('PostsContext', PostsContext)
class Header extends Component<any, any> {
  constructor (props: any) {
    super(props)
  }

  // @setBury({}, BuryHeaderComponentDidMount)
  componentDidMount () {
    
  }

  render () {
    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to='/'> <img src='https://fealight.cn/assets/user/images/logo.png' alt=''/></Link>
        </div>

        <ul className={styles.nav}>
          <li><Link to='/'>网站首页</Link></li>
          <li><Link to='/design'>设计作品</Link></li>
          <li><Link to='/about'>关于我们</Link></li>
          <li><Link to='/contact'>联系我们</Link></li>
        </ul>
      </header>
    )
  }
}

export default injectIntl(Header)
