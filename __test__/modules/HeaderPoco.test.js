import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import HeaderPoco from '@src/modules/mobile/Header/HeaderPoco'

Enzyme.configure({ adapter: new Adapter() })

const wrapper = shallow(
  <HeaderPoco />
)

describe('<HeaderPoco /> render', () => {
  describe('显示模块', () => {
    test('DOM 渲染正确', () => {
      expect(wrapper.is('header')).toEqual(true)
    })
  })
})
