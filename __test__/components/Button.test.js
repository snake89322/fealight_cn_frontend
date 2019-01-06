import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Button from '@src/components/Button'

Enzyme.configure({ adapter: new Adapter() })

const wrapper = shallow(
  <Button />
)

describe('<Button /> render', () => {
  describe('显示模块', () => {
    test('DOM 渲染正确', () => {
      expect(wrapper.is('button')).toEqual(true)
    })
  })
})
