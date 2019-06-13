import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0b4c90',
  },
  titleContainer: {
    width: 110,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    padding: 5,
    flex: 1,
  },
  text: {
    fontSize: 14,
  }
})