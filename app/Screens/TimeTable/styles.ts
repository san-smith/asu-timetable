import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flexGrow: 1,
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
  },
  emptyList: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 30,
    backgroundColor: 'rgba(14, 101, 191, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 101, 191, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIsCurrentDate: {
    height: 30,
    backgroundColor: '#FF9900',
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 101, 191, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: '300',
    fontSize: 15,
  },
  separator: {
    marginBottom: 5,
  },
  currentDate: {
    color: 'white',
    fontWeight: '300',
    fontSize: 15,
  },
  currentItem: {
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: '#d7fce1'
  }
})