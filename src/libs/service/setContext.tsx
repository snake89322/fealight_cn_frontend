
import * as React from 'react'
import { Context } from 'react'

export const setContext = (propName: string, Context: Context<object>) => (Orig: any) => (props: any) => {
  console.log
  return (
    <Context.Consumer>
      {(value: any) => <Orig {...props} {...{ [propName]: value }} />}
    </Context.Consumer>
  )
}
