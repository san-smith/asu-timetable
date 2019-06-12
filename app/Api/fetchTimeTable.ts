
export default function fetchTimeTable(baseUrl: string, endpoint: string) {
  return fetch(`${baseUrl}${endpoint}?file=${endpoint.slice(0, endpoint.length-2)}.ics`)
  .then((data: any) => data.text())
}