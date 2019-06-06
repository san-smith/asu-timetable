import React, {Component} from 'react'
import {Text, View, Alert, FlatList, AsyncStorage } from 'react-native'
import styles from './styles'
import { NavigationScreenProp } from 'react-navigation'
import { Favorite } from 'Types/favorite'
import Header from 'Components/Header'
import ListItemWithFavorite from 'Components/ListItemWithFavorite'
import Loader from 'Components/Loader'
import Search from 'Components/Search'

interface FavoritesProps {
  navigation: NavigationScreenProp<any>,
}

interface FavoritesState {
  favorites: Array<Favorite> | null,
  inProgress: boolean,
  search: string,
}

class FavoritesScreen extends Component<FavoritesProps, FavoritesState> {
  constructor(props: FavoritesProps) {
    super(props)
    this.state = {
      favorites: null,
      inProgress: false,
      search: '',
    }
  }

  async componentDidMount() {
    try {
      this.setState({inProgress: true})
      const favoriteStore: Favorite[] = JSON.parse(await AsyncStorage.getItem(`FavoriteStore`) || '[]');
      this.setState({ favorites: favoriteStore })
    } catch (e) {
      Alert.alert('Ошибка', e.message)
    } finally {
      this.setState({inProgress: false})
    }    
  }

  goToTimeTable = (facultyUrl: string, groupUrl: string) => {
    this.props.navigation.navigate('TimeTable', {facultyUrl, groupUrl})
  }

  onSearch = (search: string) => {
    this.setState({search})
  }

  getFavorites(): Array<Favorite> {
    const {search, favorites} = this.state
    if (!favorites) return []
    return favorites.filter(favorites => favorites.favoriteName.includes(search))
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}
        title={ 'Избранное' } />
        <Search onTextChange={this.onSearch} />

        {this.state.inProgress
          ? <Loader />
          : <FlatList
            data={this.getFavorites()}
            contentContainerStyle={styles.content}
            renderItem={(item) => this.renderItem(item.item)}
            keyExtractor={this.keyExtractor}
            ListEmptyComponent={this.renderEmpty()}
          />}
        
      </View>
    );
  }

  renderItem = (item: Favorite) => (
    <ListItemWithFavorite
      onPress={() => this.goToTimeTable(item.facultyUrl, item.groupUrl)}
      title={item.favoriteName}
      onPressFavorite={async () => {
        const favoriteStore: Favorite[] = JSON.parse(await AsyncStorage.getItem(`FavoriteStore`) || '[]');
        favoriteStore.splice(favoriteStore.findIndex(x => x.favoriteName === item.favoriteName), 1);
        await AsyncStorage.setItem(`FavoriteStore`, JSON.stringify(favoriteStore));
      }} />
  )

  renderEmpty = () => (
    <View style={styles.emptyList}>
      <Text style={styles.itemText}>Список избранного пока пуст</Text>
    </View>
  )

  keyExtractor = (item: Favorite) => item.facultyUrl + item.groupUrl
}

export default FavoritesScreen