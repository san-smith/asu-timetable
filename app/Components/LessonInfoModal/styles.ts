import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#0b4c90',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#0b4c90',
    justifyContent: 'center',
    alignItems: 'center',
  },
})