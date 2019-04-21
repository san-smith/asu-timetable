/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import { createStackNavigator, createAppContainer } from "react-navigation"
import Home from 'Screens/Home'
import Faculty from 'Screens/Faculty'
import Groups from 'Screens/Groups'
import TimeTable from 'Screens/TimeTable'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Faculty: {
      screen: Faculty,
    },
    Groups: {
      screen: Groups,
    },
    TimeTable: {
      screen: TimeTable,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

export default createAppContainer(AppNavigator)
