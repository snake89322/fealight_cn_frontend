// base
import * as React from 'react'
import { Component, Fragment } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// i18n
import { IntlProvider } from 'react-intl'
import * as messages from '@/src/translation/en_US'

// routes
const routes = require('./routes').default
const renderRoutes = require('react-router-config').renderRoutes

// style
import 'normalize.css'
import './index.scss'

// commons
import { Header } from '@/src/modules'

class Root extends Component {
  render = () => (
    <IntlProvider locale={'en-IN'} messages={messages}>
      <Fragment>
        <Header />
        {renderRoutes(routes)}
      </Fragment>
    </IntlProvider>
  )
}

ReactDOM.render(
  <BrowserRouter basename='/'>
    <Root />
  </BrowserRouter>,
  document.getElementById('root')
)