import {TIME_TABLE_URL} from 'Consts'

export default function fetchGroups(url: string) {
  return fetch(`${TIME_TABLE_URL}${url}`)
    .then((data: any) => data.text())
}

