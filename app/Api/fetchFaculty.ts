import {TIME_TABLE_URL} from 'Consts'

export default function fetchFaculty() {
    return fetch(TIME_TABLE_URL)
        .then((data: any) => data.text())
}

