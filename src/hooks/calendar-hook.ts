import { useDispatch, useSelector } from "react-redux";
import { AppStore, clearCalendarStore, setActiveEvent, setEvents, setLang } from "../store";
import { CalendarEvent, Langs, ServerResponse } from "../definitions";
import { calendarApi } from "../api";
import { mapEventsToJSData } from "../helpers/map-events-to-js-date";

export default function useCalendarStore() {
  const dispatch = useDispatch()
  const { lang, events, activeEvent } = useSelector((state: AppStore) => state.calendar)

  const setLangFn = (lang: Langs) => dispatch(setLang(lang))
  const setEventsFn = (events: CalendarEvent[]) => dispatch(setEvents(events))
  const setActiveEventFn = (event: CalendarEvent | null) => dispatch(setActiveEvent(event))
  const clearCalendarStoreFn = () => dispatch(clearCalendarStore())

  const startSavingEvent = async (event: CalendarEvent) => {
    if (event._id) {
      try {
        await calendarApi.put(`event/${event._id}`, event)
        await startLoadingEvents()

      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        delete event._id
        await calendarApi.post('event', { ...event })
        await startLoadingEvents()

      } catch (error) {
        console.log(error)
      }
    }
  }

  const startLoadingEvents = async () => {
    try {
      const resp = await calendarApi.get('event')
      const { data }: ServerResponse<{ count: number, list: CalendarEvent[] }> = resp.data
      const mappedData = mapEventsToJSData(data?.list ?? [])
      setEventsFn(mappedData)
    } catch (error) {
      console.log(error)
    }
  }

  const startDeletingEvent = async (id: string) => {
    try {
      await calendarApi.delete(`event/${id}`)
      startLoadingEvents()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    lang,
    events,
    activeEvent,
    setLang: setLangFn,
    setEvents: setEventsFn,
    setActiveEvent: setActiveEventFn,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
    clearCalendarStoreFn: clearCalendarStoreFn,
  }
}