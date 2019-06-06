import React, {Component, ReactNode} from 'react'
import {Text, View, TouchableOpacity, FlatList, Button } from 'react-native'

import styles from './styles'

interface HeaderProps {
  title: string,
  onPress: () => void,
  onPressFavorite: () => void
}

class Header extends Component<HeaderProps> {

  render() {
    const {title, onPress, onPressFavorite} = this.props
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.container, { flex: 9 }]}
          onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.container, { flex: 1 }]}
          onPress={onPressFavorite}>
          <Text style={styles.favoriteButton}>:)</Text>
        </TouchableOpacity>
      </View>
    );
  }


}

export default Header