import { Langs } from "../definitions";

const EsMessages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: (total: number) => `+ Ver más (${total})`
};

const EnMessages = {
  allDay: 'All day',
  previus: '<',
  next: '>',
  today: 'Today',
  month: 'Month',
  week: 'Week',
  day: 'Day',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Time',
  event: 'Event',
  noEventsInRange: 'No events in range',
  showMore: (total: number) => `+ see more (${total})`
}

export const CalendarMessages = {
  [Langs.en]: EnMessages,
  [Langs.es]: EsMessages,
}