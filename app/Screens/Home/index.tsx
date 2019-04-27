import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import DatePanel from 'Components/DatePanel'

import styles from './styles'
import StudentsButton from './components/StudentsButton'

interface HomeProps {
  navigation: NavigationScreenProp<any>,
}
class Home extends Component<HomeProps> {

  goToFaculty = () => {
    this.props.navigation.navigate('Faculty')
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <DatePanel />
        <StudentsButton onPress={this.goToFaculty}
        />
      </ScrollView>
    );
  }
}

export default Home