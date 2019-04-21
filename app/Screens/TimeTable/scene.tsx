import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Group } from 'Types/group'
import fetchTimeTable from 'Api/fetchTimeTable'

interface TimeTableProps {
  navigation: NavigationScreenProp<any>,
}

interface TimeTableState {
  timeTable: string | null,
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
      this.setState({timeTable})
      console.log(timeTable)
    } catch (e) {
      console.error(e)
    }
    
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Группы</Text>
        <TouchableOpacity onPress={this.goBack} >
          <Text>BACK</Text>
        </TouchableOpacity>
        <Text>{this.state.timeTable}</Text>

        {/* <FlatList
          data={this.state.groups || []}
          contentContainerStyle={styles.content}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty()}
        /> */}
      </View>
    );
  }

  renderItem = (item: Group) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список факультетов пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Group) => item.url
}

export default TimeTableScreen