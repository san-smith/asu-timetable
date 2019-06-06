import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Alert, SectionList } from 'react-native'
import groupBy from 'lodash/groupBy'
import mapKeys from 'lodash/mapKeys'
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
import 'moment/min/moment-with-locales'

interface TimeTableProps {
  navigation: NavigationScreenProp<any>,
}

interface TimeTableState {
  timeTable: Array<CalendarEvent> | null,
  inProgress: boolean,
}

class TimeTableScreen extends Component<TimeTableProps, TimeTableState> {
  constructor(props: TimeTableProps) {
    super(props)
    this.state = {
      timeTable: null,
      inProgress: false,
    }
  }
  isCurrentDate (date:string): boolean {
      var currentDate = moment().format('dddd, DD.MM.YYYY');
      var data = moment(date)
      return (currentDate === data.format('dddd, DD.MM.YYYY'));
  }

  async componentDidMount() {
    try {
      this.setState({inProgress: true})
      const facultyUrl = this.props.navigation.getParam('facultyUrl')
      const groupUrl = this.props.navigation.getParam('groupUrl')
      const data = await fetchTimeTable(facultyUrl, groupUrl)
      const parsed = parseTimeTable(data)
      const timeTable = parsed.events.map((event: any) => normalizeCalendarEvent(event))
      this.setState({timeTable})
    // console.log(timeTable)
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({inProgress: false})
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

  render() {
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
      </View>
    );
  }

  renderItem = (item: CalendarEvent) => { 
    const date = item.startDate
    return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.summary}</Text>
    </TouchableOpacity>
  )
  }

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список занятий пока пуст</Text>
    </View>
  )

  renderSectionHeader = (title: string) => {
    const date = moment(title)
    date.locale('ru')
    return (
      <View style={[styles.header, this.isCurrentDate(date.toString()) && styles.headerIsCurrentDate]}>

        <Text style={[styles.headerTitle, this.isCurrentDate(date.toString()) && styles.currentDate]}>{date.format('dddd, DD.MM.YYYY')}</Text>
      </View>
    )
  }

  renderSeparator = () => (
    <View style={styles.separator}  />
  )

  keyExtractor = (event: CalendarEvent) => event.uid
}

export default TimeTableScreen