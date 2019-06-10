import moment from 'moment'

export default function getLocalDay(date: string | moment.Moment): string {
  switch (moment(date).isoWeekday()) {
    case 1: return 'Понедельник'
    case 2: return 'Вторник'
    case 3: return 'Среда'
    case 4: return 'Четверг'
    case 5: return 'Пятница'
    case 6: return 'Суббота'
    case 7: return 'Воскресенье'
    default: return ''
  }
}