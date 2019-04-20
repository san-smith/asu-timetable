import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList } from 'react-native'
import fetchFaculty from 'Api/fetchFaculty'
import parseFaculty from 'Utils/parseFaculty'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'

export interface Faculty {
  name: string,
  url: string,
}

interface FacultyProps {
  navigation: NavigationScreenProp<any>,
}

interface FacultyState {
  faculties: Array<Faculty> | null,
}

class FacultyScreen extends Component<FacultyProps, FacultyState> {
  constructor(props: FacultyProps) {
    super(props)
    this.state = {
      faculties: null,
    }
  }

  componentDidMount() {
    fetchFaculty()
    .then(data => this.setState({ faculties: parseFaculty(data) }))
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Faculty</Text>
        <TouchableOpacity onPress={this.goBack} >
          <Text>BACK</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.faculties || []}
          contentContainerStyle={styles.content}
          renderItem={(item) => this.renderItem(item.item)}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty()}
        />
      </View>
    );
  }

  renderItem = (item: Faculty) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список факультетов пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Faculty) => item.url
}

export default FacultyScreen