import HomeScene from './scene'
import { connect } from 'react-redux'

import { setUrl } from 'Store/Url/actions'

function mapStateToProps (state: any) {
  return {
    url: state.url.url,
  }
}

const actions = {
  setUrl,
}

export default connect(mapStateToProps, actions)(HomeScene)