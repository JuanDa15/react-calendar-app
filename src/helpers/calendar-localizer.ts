import { dateFnsLocalizer } from "react-big-calendar"
import { enUS, es } from "date-fns/locale"
import { parse, startOfWeek, getDay, format } from 'date-fns'

const locales = {
  'en-US': enUS,
  'es-ES': es,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
