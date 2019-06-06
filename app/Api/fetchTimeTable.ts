export default function fetchTimeTable(facultyUrl: string, groupUrl: string) {
  return fetch(`${facultyUrl}${groupUrl}?file=${groupUrl.slice(0, groupUrl.length-2)}.ics`)
  .then((data: any) => data.text())
}