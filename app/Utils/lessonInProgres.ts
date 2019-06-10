import moment from 'moment'
import CalendarEvent from 'Types/calendarEvent'

export default function lessonInProgress(item: CalendarEvent): boolean {
  const startTime = moment(item.startTime)
  const endTime = startTime.add(90, 'minutes')
  const currentTime = moment()
  return currentTime > startTime && currentTime < endTime
}