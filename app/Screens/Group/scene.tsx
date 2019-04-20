import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'
import fetchGroups from 'Api/fetchGroups'
import parseGroup from 'Utils/parseGroup'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Group } from 'Types/group'

interface GroupProps {
  navigation: NavigationScreenProp<any>,
}

interface GroupState {
  groups: Array<Group> | null,
}

class GroupScreen extends Component<GroupProps, GroupState> {
  constructor(props: GroupProps) {
    super(props)
    this.state = {
      groups: null,
    }
  }

  componentDidMount() {
    const url = this.props.navigation.getParam('url')
    fetchGroups(url)
    .then(data => this.setState({ groups: parseGroup(data) }))
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

        <FlatList
          data={this.state.groups || []}
          contentContainerStyle={styles.content}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty()}
        />
      </View>
    );
  }

  renderItem = (item: Group) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список факультетов пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Group) => item.url
}

export default GroupScreen