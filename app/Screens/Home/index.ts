import HomeScene from './scene'
import { connect } from 'react-redux'

import { setUrl, setUrlType } from 'Store/Url/actions'

function mapStateToProps (state: any) {
  return {
    url: state.url.url,
  }
}

const actions = {
  setUrl,
  setUrlType,
}

export default connect(mapStateToProps, actions)(HomeScene)