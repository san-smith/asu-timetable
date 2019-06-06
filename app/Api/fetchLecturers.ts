export default function fetchLecturers(url: string) {
  return fetch(url)
    .then((data: any) => data.text())
}

