import * as React from 'react'

interface Diff {
  api: any,
  locals: Array<string>
}

interface DiffItem {
  [key: string]: Diff
}

interface DiffConfig {
  data: DiffItem,
  html: DiffItem,
  js: DiffItem,
  css: DiffItem
}

export const diffConfig: DiffConfig = {
  data: {
    titleText: {
      api: 'hello world',
      locals: ['in']
    },
    diffTitleText: {
      api: 'diff hello world',
      locals: ['in']
    }
  },
  html: {
    diffTitle: {
      api: function () {
        return (<h2>this diff title</h2>)
      },
      locals: ['hk']
    }
  },
  js: {

  },
  css: {

  }
}