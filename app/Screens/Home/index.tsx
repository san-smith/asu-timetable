import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import DatePanel from 'Components/DatePanel'
import {TIME_TABLE_URL, LECTURERS_TIME_TABLE_URL} from 'Consts'
import styles from './styles'
import StudentsButton from './components/StudentsButton/'
import LecturersButton from './components/LecturersButton/'

interface HomeProps {
  navigation: NavigationScreenProp<any>,
}
class Home extends Component<HomeProps> {

  goToFaculty = () => {
    this.props.navigation.navigate('Faculty', { facultyUrl: TIME_TABLE_URL })
  }

  goToLecturersFaculty = () => {
    this.props.navigation.navigate('Faculty', { facultyUrl: LECTURERS_TIME_TABLE_URL })
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
        <LecturersButton onPress={this.goToLecturersFaculty}
        />
      </ScrollView>
    );
  }
}

export default Home