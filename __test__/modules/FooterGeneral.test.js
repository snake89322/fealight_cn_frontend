import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import FooterGeneral from '@src/modules/mobile/Footer/FooterGeneral'

Enzyme.configure({ adapter: new Adapter() })

const wrapper = shallow(
  <FooterGeneral />
)

describe('<FooterGeneral /> render', () => {
  describe('显示模块', () => {
    test('DOM 渲染正确', () => {
      expect(wrapper.is('footer')).toEqual(true)
    })
  })
})
