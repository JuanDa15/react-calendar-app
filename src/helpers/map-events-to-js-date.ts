import { parseISO } from "date-fns";
import { CalendarEvent } from "../definitions";

export function mapEventsToJSData(events: CalendarEvent[] = []): CalendarEvent[] {
  return events.map((event) => {
    event.start = parseISO(event.start.toString())
    event.end = parseISO(event.end.toString())
    return event
  })
}