import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

interface RowProps {
  title: string,
  text: string,
}

class Row extends PureComponent<RowProps> {
  render() {
    const { title, text } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={5} style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}

export default Row