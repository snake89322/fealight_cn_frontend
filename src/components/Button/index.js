import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as styles from './index.scss'

export default class Button extends Component {
  static propTypes = {
    handleClick: PropTypes.func
  }

  render () {
    return (
      <button className={styles.button} onClick={this.props.handleClick}>Button</button>
    )
  }
}
