import React, {Component, ReactNode} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'

import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'

interface HeaderProps {
  navigation: NavigationScreenProp<any>,
  title: string,
  right?: ReactNode,
}

class Header extends Component<HeaderProps> {

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const {title, right} = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.goBack} >
          <Text style={styles.backText}>Назад</Text>
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.button}>
          {right}
        </View>
      </View>
    );
  }


}

export default Header