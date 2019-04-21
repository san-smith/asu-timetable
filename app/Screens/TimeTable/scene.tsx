import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Group } from 'Types/group'
import fetchTimeTable from 'Api/fetchTimeTable'
import parseTimeTable from 'Utils/parseTimeTable'
import normalizeCalendarEvent from 'Utils/normalizeCalendarEvent'
import CalendarEvent from 'Types/calendarEvent'

interface TimeTableProps {
  navigation: NavigationScreenProp<any>,
}

interface TimeTableState {
  timeTable: Array<CalendarEvent> | null,
}

class TimeTableScreen extends Component<TimeTableProps, TimeTableState> {
  constructor(props: TimeTableProps) {
    super(props)
    this.state = {
      timeTable: null,
    }
  }

  async componentDidMount() {
    try {
      const facultyUrl = this.props.navigation.getParam('facultyUrl')
      const groupUrl = this.props.navigation.getParam('groupUrl')
      const timeTable = await fetchTimeTable(facultyUrl, groupUrl)
      const parsed = parseTimeTable(timeTable)
      this.setState({timeTable: parsed.events.map((event: any) => normalizeCalendarEvent(event))})
      // console.log(parsed.events.map((event: any) => normalizeCalendarEvent(event)))
    } catch (e) {
      console.error(e)
    }
    
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    console.log(this.state.timeTable)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Группы</Text>
        <TouchableOpacity onPress={this.goBack} >
          <Text>BACK</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.timeTable || []}
          contentContainerStyle={styles.content}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty()}
        />
      </View>
    );
  }

  renderItem = (item: CalendarEvent) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.summary}</Text>
    </TouchableOpacity>
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список занятий пока пуст</Text>
    </View>
  )

  keyExtractor = (event: CalendarEvent) => event.uid
}

export default TimeTableScreen