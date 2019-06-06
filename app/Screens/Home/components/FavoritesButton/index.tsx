import React, {PureComponent} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'

import styles from './styles'

interface FavoritesButtonProps {
  onPress: () => void,
}
class FavoritesButton extends PureComponent<FavoritesButtonProps> {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={styles.container}>
          <Text style={styles.text}>Избранное</Text>
      </TouchableOpacity>
    );
  }
}

export default FavoritesButton