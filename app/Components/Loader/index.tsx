import React, {PureComponent} from 'react'
import {ActivityIndicator } from 'react-native'
import styles from './styles'

interface LoaderProps {
  size?: 'small' | 'large'
  color?: 'string'
}

class Loader extends PureComponent<LoaderProps> {
  static defaultProps = {
    color: '#0b4c90',
    size: 'large',
  }
  render() {
    const {size, color} = this.props
    return (
      <ActivityIndicator style={styles.container} color={color} size={size} />
    )
  }
}

export default Loader