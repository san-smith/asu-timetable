import React, {PureComponent} from 'react'
import {TextInput, View} from 'react-native'
import styles from './styles'

interface SearchProps {
  onTextChange: (text: string) => void
}

class Search extends PureComponent<SearchProps> {

  render() {
    const {onTextChange, } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Поиск'
          onChangeText={onTextChange}
          style={styles.input}/>
      </View>
    )
  }
}

export default Search