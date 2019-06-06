import React, {Component} from 'react'
import {Text, View, Alert, FlatList } from 'react-native'
import fetchLecturers from 'Api/fetchLecturers'
import parseLecturer from 'Utils/parseLecturer'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Lecturer } from 'Types/lecturer'
import Header from 'Components/Header'
import ListItem from 'Components/ListItem'
import Loader from 'Components/Loader'
import Search from 'Components/Search'

interface LecturersProps {
  navigation: NavigationScreenProp<any>,
}

interface LecturersState {
  lecturers: Array<Lecturer> | null,
  inProgress: boolean,
  search: string,
}

class LecturersScreen extends Component<LecturersProps, LecturersState> {
  constructor(props: LecturersProps) {
    super(props)
    this.state = {
      lecturers: null,
      inProgress: false,
      search: '',
    }
  }

  async componentDidMount() {
    try {
      const url = `${this.props.navigation.getParam('facultyUrl')}${this.props.navigation.getParam('departmentUrl')}`
      this.setState({inProgress: true})
      const lecturers = await fetchLecturers(url)
      this.setState({ lecturers: parseLecturer(lecturers) })
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({inProgress: false})
    }    
  }

  goToTimeTable = (lecturerUrl: string) => {
    const facultyUrl = `${this.props.navigation.getParam('facultyUrl')}${this.props.navigation.getParam('departmentUrl')}`
    this.props.navigation.navigate('TimeTable', {facultyUrl, groupUrl: lecturerUrl})
  }

  onSearch = (search: string) => {
    this.setState({search})
  }

  getLecturers(): Array<Lecturer> {
    const {search, lecturers} = this.state
    if (!lecturers) return []
    return lecturers.filter(lecturer => lecturer.name.includes(search))
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}
        title={ 'Преподаватели' } />
        <Search onTextChange={this.onSearch} />

        {this.state.inProgress
          ? <Loader />
          : <FlatList
            data={this.getLecturers()}
            contentContainerStyle={styles.content}
            renderItem={(item) => this.renderItem(item.item)}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderEmpty()}
          />}
        
      </View>
    );
  }

  renderItem = (item: Lecturer) => (
    <ListItem
      onPress={() => this.goToTimeTable(item.url)}
      title={item.name} />
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список преподавателей пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Lecturer) => item.url
}

export default LecturersScreen