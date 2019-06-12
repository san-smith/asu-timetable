import LecturesScene from './scene'
import { connect } from 'react-redux'

function mapStateToProps (state: any, props: any) {
  return {
    url: state.url.url,
    departmentUrl: props.navigation.getParam('departmentUrl'),
  }
}

export default connect(mapStateToProps, null)(LecturesScene)