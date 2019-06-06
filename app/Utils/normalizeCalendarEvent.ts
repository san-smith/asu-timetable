import moment from 'moment-timezone'
import CalendarEvent from 'Types/calendarEvent'

export default function normalizeCalendarEvent(event: any): CalendarEvent {
  const startTime = moment(event.dtstart.value).utc().toString().split(' ')[4].split(':')
  const endTime = moment(event.dtend.value).utc().toString().split(' ')[4].split(':')
  return {
    professor: event.description.value,
    startDate: moment(event.dtstart.value).utc().format('YYYY-MM-DD'),
    startTime: moment(event.dtstart.value).utc().format('YYYY-MM-DDThh:mm:ss'),
    location: event.location.value,
    summary: (event.description.value !== ''
      ? event.summary.value.replace(' ', `-${endTime[0]}:${endTime[1]} `)
      : `${startTime[0]}:${startTime[1]}-${endTime[0]}:${endTime[1]} ${event.summary.value}`),
    uid: event.uid.value,
  }
}