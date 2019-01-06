// @flow
const asyncComponent = require('@/src/libs').asyncComponent

const moduleConfig = {
  local: `in`
}

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import(/* webpackChunkName: "Index" */ './pages/Home'), moduleConfig)
  }
]
