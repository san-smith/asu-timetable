export const SET_URL = 'SET_URL'
export const SET_URL_TYPE = 'SET_URL_TYPE'

export function setUrl(url: string) {
  return {
    type: SET_URL,
    payload: url,
  }
}

export function setUrlType(urlType: string) {
  return {
    type: SET_URL_TYPE,
    payload: urlType,
  }
}