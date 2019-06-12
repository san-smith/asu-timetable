import { SET_URL, SET_URL_TYPE } from './actions'
import { UrlReducerState } from 'Types/store'


const initialState = {
  url: '',
  type: 'unknown',
}

export default (state: UrlReducerState = initialState, action: any): UrlReducerState => {
  switch (action.type) {
    case SET_URL:
      return { ...state, url: action.payload }
    case SET_URL_TYPE: 
      return { ...state, type: action.payload }
    default:
      return state
  }
}