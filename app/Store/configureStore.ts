import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
})
const store = createStore(rootReducer, composeEnhancers(
  // applyMiddleware(...middleware),
  // other store enhancers if any
))

export default () => {
  return { store }
}