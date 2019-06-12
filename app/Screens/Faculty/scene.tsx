import React, {Component} from 'react'
import {Text, View, FlatList, Alert } from 'react-native'
import fetchFaculty from 'Api/fetchFaculties'
import parseFaculty from 'Utils/parseFaculty'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Faculty } from 'Types/faculty'
import Header from 'Components/Header'
import ListItem from 'Components/ListItem'
import Loader from 'Components/Loader'
import Search from 'Components/Search'
import {STUDENTS_TIME_TABLE_URL, LECTURERS_TIME_TABLE_URL} from 'Consts'

interface FacultyProps {
  navigation: NavigationScreenProp<any>,
  url: string,
  type: string,
  setUrl: (url: string) => void,
}

interface FacultyState {
  faculties: Array<Faculty> | null,
  inProgress: boolean,
  search: string,
}

class FacultyScreen extends Component<FacultyProps, FacultyState> {
  constructor(props: FacultyProps) {
    super(props)
    this.state = {
      faculties: null,
      inProgress: false,
      search: '',
    }
  }

  async componentDidMount() {
    try {
      this.setState({ inProgress: true })
      const faculties = await fetchFaculty(this.props.url)
      this.setState({ faculties: parseFaculty(faculties) })
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({ inProgress: false })
    }    
  }

  goToGroups = (url: string) => {
    this.props.setUrl(url)
    this.props.navigation.navigate('Groups', { groupUrl: url })
  }

  onSearch = (search: string) => {
    this.setState({ search })
  }

  getFaculties(): Array<Faculty> {
    const { search, faculties } = this.state
    if (!faculties) return []
    return faculties.filter(faculty => faculty.name.includes(search))
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}
          title={'Факультеты'} />
        <Search onTextChange={this.onSearch} />
        {this.state.inProgress
          ? <Loader />
          : <FlatList
          data={this.getFaculties()}
          contentContainerStyle={styles.content}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty()}
          keyboardShouldPersistTaps='handled'
        />}
      </View>
    )
  }

  renderItem = (item: Faculty) => {
    const url = this.props.type === 'students'
      ? `${STUDENTS_TIME_TABLE_URL}${item.url}`
      : `${LECTURERS_TIME_TABLE_URL}${item.url}`
    return (
      <ListItem
        onPress={() => this.goToGroups(url)}
        title={item.name} />
    )
  }

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список факультетов пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Faculty) => item.url
}

export default FacultyScreen