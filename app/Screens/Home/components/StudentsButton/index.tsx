import React, {PureComponent} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'

import styles from './styles'

interface StudentsButtonProps {
  onPress: () => void,
}
class StudentsButton extends PureComponent<StudentsButtonProps> {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={styles.container}>
          <Text style={styles.text}>Расписание студентов</Text>
      </TouchableOpacity>
    );
  }
}

export default StudentsButton