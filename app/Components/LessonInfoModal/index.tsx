import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, Modal } from 'react-native'
import moment from 'moment'
import CalendarEvent from 'Types/calendarEvent'
import Row from './components/Row'

import styles from './styles'

interface LessonInfoModalProps {
  event: CalendarEvent,
  onPress: () => void,
  visible: boolean,
}

class LessonInfoModal extends PureComponent<LessonInfoModalProps> {

  render() {
    const { event, onPress, visible } = this.props
    console.log(event)
    return (
      <Modal visible={visible} >
        <View style={styles.container} >
          <View style={styles.header}>
            <Text style={styles.title}>Информация о занятии</Text>
          </View>

          <View style={styles.content}>
            <Row title='Дата:' text={moment(event.startTime).format('DD.MM.YYYY')} />
            <Row title='Время:' text={moment(event.startTime).format('HH:mm')} />
            <Row title='Преподаватель:' text={event.professor} />
            <Row title='Аудитория:' text={event.location} />
            <Row title='Общая информация:' text={event.summary} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}>
              <Text style={styles.title}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  
    )
  }


}

export default LessonInfoModal