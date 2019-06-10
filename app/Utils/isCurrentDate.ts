import moment from 'moment'

export default function isCurrentDate(date: string): boolean {
  const currentDate = moment()
  const checkingDate = moment(date)
  return currentDate.format('YYYYMMDD') === checkingDate.format('YYYYMMDD')
}