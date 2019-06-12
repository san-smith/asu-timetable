import TimeTableScene from './scene'
import { connect } from 'react-redux'

function mapStateToProps (state: any, props: any) {
  return {
    baseUrl: props.navigation.getParam('baseUrl'),
    endpoint: props.navigation.getParam('endpoint'),
  }
}

export default connect(mapStateToProps, null)(TimeTableScene)