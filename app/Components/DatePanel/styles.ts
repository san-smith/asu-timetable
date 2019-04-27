import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5FCFF',
    height: 80,
    marginBottom: 20,
    flexDirection: 'row',
  },
  date: {
    backgroundColor: '#0b4c90',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 50,
    fontWeight: '700',
  },
  monthContainer: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#0b4c90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    color: 'black',
    fontSize: 40,
  }
});