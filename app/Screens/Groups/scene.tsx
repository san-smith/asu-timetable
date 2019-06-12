import React, {Component} from 'react'
import {Text, View, Alert, FlatList, AsyncStorage } from 'react-native'
import fetchGroups from 'Api/fetchGroups'
import parseGroup from 'Utils/parseGroup'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Group } from 'Types/group'
import Header from 'Components/Header'
import ListItem from 'Components/ListItem'
import ListItemWithFavorite from 'Components/ListItemWithFavorite'
import Loader from 'Components/Loader'
import Search from 'Components/Search'
import { Favorite } from 'Types/favorite'

interface GroupsProps {
  navigation: NavigationScreenProp<any>,
  url: string,
  type: string,
}

interface GroupsState {
  groups: Array<Group> | null,
  inProgress: boolean,
  search: string,
}

class GroupsScreen extends Component<GroupsProps, GroupsState> {
  constructor(props: GroupsProps) {
    super(props)
    this.state = {
      groups: null,
      inProgress: false,
      search: '',
    }
  }

  async componentDidMount() {
    try {
      const url = this.props.url
      this.setState({ inProgress: true })
      const groups = await fetchGroups(url)
      this.setState({ groups: parseGroup(groups) })
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({ inProgress: false })
    }    
  }

  goToTimeTable = (groupUrl: string) => {
    const baseUrl = this.props.url
    this.props.navigation.navigate('TimeTable', { baseUrl, endpoint: groupUrl})
  }

  goToLecturers = (departmentUrl: string) => {
    this.props.navigation.navigate('Lecturers', { departmentUrl })
  }

  onSearch = (search: string) => {
    this.setState({ search })
  }

  getGroups(): Array<Group> {
    const { search, groups } = this.state
    if (!groups) return []
    return groups.filter(group => group.name.includes(search))
  }

  onItemPress = (url: string) => {
    const { type } = this.props
    if (type === 'students') {
      this.goToTimeTable(url)
    } else {
      this.goToLecturers(url)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title={this.props.type === 'students' ? 'Группы' : 'Кафедры' } />
        <Search onTextChange={this.onSearch} />

        {this.state.inProgress
          ? <Loader />
          : <FlatList
            data={this.getGroups()}
            contentContainerStyle={styles.content}
            renderItem={(item) => this.renderItem(item.item)}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderEmpty()}
            keyboardShouldPersistTaps='handled'
          />}
        
      </View>
    )
  }

  renderItem = (item: Group) => {
    return (
      <ListItem
        onPress={() => this.onItemPress(item.url)}
        title={item.name} />
    )
  }

  renderEmpty = () => {
    const { type } = this.props
    return (
      <View style={styles.emptyList}>
        <Text style={styles.itemText}>Список {type === 'students' ? 'групп' : 'кафедр'} пока пуст</Text>
      </View>
    )
  }

  keyExtractor = (item: Group) => item.url
}

export default GroupsScreen