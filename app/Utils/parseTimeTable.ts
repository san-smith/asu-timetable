import ical from 'cal-parser'

export default function parseTimeTable(str: string) {
  return ical.parseString(str)
}