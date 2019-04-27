import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#0b4c90',
    height: 50,
    flexDirection: 'row',
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  backText: {
    color: 'white',
    fontSize: 15,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});