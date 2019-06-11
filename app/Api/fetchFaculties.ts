export default function fetchFaculties(url: string) {
  return fetch(url)
    .then((data: any) => data.text())
}

