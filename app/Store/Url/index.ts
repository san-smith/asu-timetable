import { SET_URL } from './actions'

export interface UrlReducerState {
  url: string,
}

const initialState = {
  url: '',
}

export default (state: UrlReducerState = initialState, action: any): UrlReducerState => {
  switch (action.type) {
    case SET_URL:
      return { ...state, url: action.payload }

    default:
      return state
  }
}