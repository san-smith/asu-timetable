import React, {Component} from 'react'
import {Platform, Text, View, TouchableOpacity} from 'react-native'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface HomeProps {
  navigation: NavigationScreenProp<any>,
}
class Home extends Component<HomeProps> {

  goToFaculty = () => {
    this.props.navigation.navigate('Faculty')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To getcbvbc started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={this.goToFaculty}
        style={styles.button}>
          <Text>Go to next screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home