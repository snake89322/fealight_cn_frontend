import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import HeaderGeneral from '@src/modules/mobile/Header/HeaderGeneral'

Enzyme.configure({ adapter: new Adapter() })

const wrapper = shallow(
  <HeaderGeneral />
)

describe('<HeaderGeneral /> render', () => {
  describe('显示模块', () => {
    test('DOM 渲染正确', () => {
      expect(wrapper.is('header')).toEqual(true)
    })
  })
})
