import moment from 'moment-timezone'
import CalendarEvent from 'Types/calendarEvent'

export default function normalizeCalendarEvent(event: any): CalendarEvent {
  return {
    professor: event.description.value,
    startDate: moment(event.dtstart.value).utc().format('YYYY-MM-DD'),
    startTime: moment(event.dtstart.value).utc().format('YYYY-MM-DDThh:mm:ss'),
    location: event.location.value,
    summary: event.summary.value,
    uid: event.uid.value,
  }
}