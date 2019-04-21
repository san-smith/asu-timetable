import {TIME_TABLE_URL} from 'Consts'

export default function fetchTimeTable(facultyUrl: string, groupUrl: string) {
  return fetch(`${TIME_TABLE_URL}${facultyUrl}${groupUrl}?file=${groupUrl.slice(0, groupUrl.length-2)}.ics`)
  .then((data: any) => data.text())
}