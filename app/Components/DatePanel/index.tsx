import React, {Component} from 'react'
import {View, Text} from 'react-native'
import moment from 'moment-timezone'
import styles from './styles'

class DatePanel extends Component {
  getLocaleMonth(): string {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
                    'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',]
    return months[moment().month()]
  }

  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{moment().format('DD')}</Text>
        </View>
        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{this.getLocaleMonth()}</Text>
        </View>
      </View>
    )
  }
}

export default DatePanel