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
      const url = this.props.navigation.getParam('groupUrl')
      this.setState({inProgress: true})
      const groups = await fetchGroups(url)
      this.setState({ groups: parseGroup(groups) })
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({inProgress: false})
    }    
  }

  goToTimeTable = (groupUrl: string) => {
    const facultyUrl = this.props.navigation.getParam('groupUrl')
    this.props.navigation.navigate('TimeTable', {facultyUrl, groupUrl})
  }

  goToLecturers = (departmentUrl: string) => {
    const facultyUrl = this.props.navigation.getParam('groupUrl')
    this.props.navigation.navigate('Lecturers', {facultyUrl, departmentUrl})
  }

  onSearch = (search: string) => {
    this.setState({search})
  }

  getGroups(): Array<Group> {
    const {search, groups} = this.state
    if (!groups) return []
    return groups.filter(group => group.name.includes(search))
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}
        title={ this.props.navigation.getParam('groupUrl').indexOf('students') !== -1 ? 'Группы' : 'Кафедры' } />
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

  renderItem = (item: Group) => (
    this.props.navigation.getParam('groupUrl').indexOf('students') === -1
    ? <ListItem
        onPress={() => this.props.navigation.getParam('groupUrl').indexOf('students') !== -1 ? this.goToTimeTable(item.url) : this.goToLecturers(item.url)}
        title={item.name} />
    : <ListItemWithFavorite
    onPress={() => this.props.navigation.getParam('groupUrl').indexOf('students') !== -1 ? this.goToTimeTable(item.url) : this.goToLecturers(item.url)}
    onPressFavorite={async () => {
      const favoriteStore: Favorite[] = JSON.parse(await AsyncStorage.getItem(`FavoriteStore`) || '[]')
      if (favoriteStore.find(x => x.favoriteName === item.name) === undefined) {
        favoriteStore.push({
          facultyUrl: this.props.navigation.getParam('groupUrl'),
          groupUrl: item.url,
          favoriteName: item.name,
        })
        await AsyncStorage.setItem(`FavoriteStore`, JSON.stringify(favoriteStore))
      }
    }}
    title={item.name} />
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список факультетов пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Group) => item.url
}

export default GroupsScreen