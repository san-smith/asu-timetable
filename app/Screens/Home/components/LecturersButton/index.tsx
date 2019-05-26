import React, {PureComponent} from 'react'
import {Text, View, TouchableOpacity, ScrollView} from 'react-native'

import styles from './styles'

interface LecturersButtonProps {
  onPress: () => void,
}
class LecturersButton extends PureComponent<LecturersButtonProps> {

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={styles.container}>
          <Text style={styles.text}>Расписание преподавателей</Text>
      </TouchableOpacity>
    );
  }
}

export default LecturersButton