import moment from 'moment-timezone'
import CalendarEvent from 'Types/calendarEvent'

export default function normalizeCalendarEvent(event: any): CalendarEvent {
  const startTime = moment(event.dtstart.value).utc()
  const endTime = moment(event.dtend.value).utc()
  return {
    professor: event.description.value,
    startDate: moment(event.dtstart.value).utc().format('YYYY-MM-DD'),
    startTime: startTime.format('YYYY-MM-DDTHH:mm:ss'),
    location: event.location.value,
    summary: (event.description.value !== ''
      ? event.summary.value.replace(' ', `-${endTime.format('HH:mm')} `)
      : `${startTime.format('HH:mm')}-${endTime.format('HH:mm')} ${event.summary.value}`),
    uid: event.uid.value,
  }
}