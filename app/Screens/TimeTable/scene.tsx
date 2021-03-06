import React, {Component} from 'react'
import { Text, View, TouchableOpacity, Alert, SectionList } from 'react-native'
import groupBy from 'lodash/groupBy'
import keys from 'lodash/keys'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import fetchTimeTable from 'Api/fetchTimeTable'
import parseTimeTable from 'Utils/parseTimeTable'
import normalizeCalendarEvent from 'Utils/normalizeCalendarEvent'
import CalendarEvent from 'Types/calendarEvent'
import Header from 'Components/Header'
import Loader from 'Components/Loader'
import moment from 'moment'
import lessonInProgress from 'Utils/lessonInProgres'
import isCurrentDate from 'Utils/isCurrentDate'
import getLocalDay from 'Utils/getLocalDay'
import LessonInfoModal from 'Components/LessonInfoModal'

interface TimeTableProps {
  navigation: NavigationScreenProp<any>,
  baseUrl: string,
  endpoint: string,
}

interface TimeTableState {
  timeTable: Array<CalendarEvent> | null,
  inProgress: boolean,
  event: CalendarEvent | null,
}

class TimeTableScreen extends Component<TimeTableProps, TimeTableState> {
  constructor(props: TimeTableProps) {
    super(props)
    this.state = {
      timeTable: null,
      inProgress: false,
      event: null,
    }
  }

  async componentDidMount() {
    const { baseUrl, endpoint } = this.props
    try {
      this.setState({ inProgress: true })
      const data = await fetchTimeTable(baseUrl, endpoint)
      const parsed = parseTimeTable(data)
      const timeTable = parsed.events.map((event: any) => normalizeCalendarEvent(event))
      this.setState({ timeTable })
    // console.log(timeTable)
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({ inProgress: false })
    } 
  }

  getGroupedTimeTable() {
    const {timeTable} = this.state
    if (!timeTable) return []
    const grouped = groupBy(this.state.timeTable, 'startDate')
    return keys(grouped).sort().map(key => ({
      title: key,
      data: grouped[key],
    }))
  }

  onItemPress = (event: CalendarEvent) => {
    this.setState({ event })
  }

  onClosePress = () => {
    this.setState({ event: null })
  }

  render() {
    const { event } = this.state
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}
          title={'Расписание'} />

        {this.state.inProgress
          ? <Loader />
          : <SectionList
            sections={this.getGroupedTimeTable()}
            renderItem={({item}) => this.renderItem(item)}
            renderSectionHeader={({section: {title}}) => this.renderSectionHeader(title)}
            ListEmptyComponent={this.renderEmpty()}
            renderSectionFooter={this.renderSeparator}
            keyExtractor={this.keyExtractor} />}
        {event && <LessonInfoModal
          visible={!!event}
          onPress={this.onClosePress}
          event={event} />}
      </View>
    )
  }
  
  renderItem = (item: CalendarEvent) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onItemPress(item)}>
        <Text style={[styles.itemText, lessonInProgress(item) && styles.currentItem]}>{item.summary}</Text>
      </TouchableOpacity>
    )
  }
  

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список занятий пока пуст</Text>
    </View>
  )

  renderSectionHeader = (title: string) => {
    return (
      <View style={[styles.header, isCurrentDate(title) && styles.headerIsCurrentDate]}>
        <Text style={[styles.headerTitle, isCurrentDate(title) && styles.currentDate]}>
          {`${getLocalDay(title)}${moment(title).format(', DD.MM.YYYY')}`}
        </Text>
      </View>
    )
  }

  renderSeparator = () => (
    <View style={styles.separator}  />
  )

  keyExtractor = (event: CalendarEvent) => event.uid
}

export default TimeTableScreen