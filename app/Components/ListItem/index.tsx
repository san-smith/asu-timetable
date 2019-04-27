import React, {Component, ReactNode} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'

import styles from './styles'

interface HeaderProps {
  title: string,
  onPress: () => void,
}

class Header extends Component<HeaderProps> {

  render() {
    const {title, onPress} = this.props
    return (
      <TouchableOpacity style={styles.container}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }


}

export default Header