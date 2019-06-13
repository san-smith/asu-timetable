import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './styles'

interface ListItemProps {
  title: string,
  onPress: () => void,
}

class ListItem extends Component<ListItemProps> {

  render() {
    const { title, onPress } = this.props
    return (
      <TouchableOpacity style={styles.container}
        onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default ListItem