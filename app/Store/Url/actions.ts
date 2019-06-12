export const SET_URL = 'SET_URL'

export function setUrl(url: string) {
  return {
    type: SET_URL,
    payload: url,
  }
}