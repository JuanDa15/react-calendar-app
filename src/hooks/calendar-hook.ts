import { useDispatch, useSelector } from "react-redux";
import { AppStore, addNewEvent, deleteEvent, setActiveEvent, setEvents, setLang, updateEvent } from "../store";
import { CalendarEvent, Langs } from "../definitions";

export default function useCalendarStore() {
  const dispatch = useDispatch()
  const { lang, events, activeEvent } = useSelector((state: AppStore) => state.calendar)

  const setLangFn = (lang: Langs) => dispatch(setLang(lang))
  const setEventsFn = (events: CalendarEvent[]) => dispatch(setEvents(events))
  const setActiveEventFn = (event: CalendarEvent | null) => dispatch(setActiveEvent(event))
  const addNewEventFn = (event: CalendarEvent) => dispatch(addNewEvent(event))
  const updateEventFn = (event: CalendarEvent) => dispatch(updateEvent(event))
  const deleteEventFn = (id: string) => dispatch(deleteEvent(id))

  const startSavingEvent = async (event: CalendarEvent) => {
    if (event._id) {
      updateEventFn(event)
    } else {
      addNewEventFn({ ...event, _id: crypto.randomUUID() })
    }
  }

  const startDeletingEvent = async (id: string) => {
    deleteEventFn(id)
  }

  return {
    lang,
    events,
    activeEvent,
    setLang: setLangFn,
    setEvents: setEventsFn,
    setActiveEvent: setActiveEventFn,
    addNewEvent: addNewEventFn,
    startSavingEvent,
    startDeletingEvent
  }
}