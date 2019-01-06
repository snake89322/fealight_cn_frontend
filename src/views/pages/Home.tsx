import * as React from 'react'
import { Component, Fragment } from 'react'

import { Home } from '@/src/modules'

// Service
import { setService } from '@/src/libs'
import { PostsService } from '@/src/services'

const moduleConfig = {
  local: `in`
}

@setService(PostsService, moduleConfig)
export default class UserIndex extends Component {
  render = () => (
    <Fragment>
      <Home {...moduleConfig} />
    </Fragment>
  )
}
