import { createSlice } from "@reduxjs/toolkit";
import { CalendarEvent, Langs } from "../../definitions";
import { addHours } from "date-fns";

export interface CalendarState {
  lang: Langs,
  events: CalendarEvent[],
  activeEvent: CalendarEvent | null,
}

const initialState: CalendarState = {
  lang: Langs.en,
  events: [
    {
      _id: crypto.randomUUID(),
      title: 'Event 1',
      notes: 'This is an event',
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: 'dfefsfe',
        name: 'sefsfsf',
      },
      bgColor: '#dd88cc',
    },
  ],
  activeEvent: null
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {
    setLang: (state, { payload }: { payload: Langs }) => ({
      ...state,
      lang: payload
    }),
    setEvents: (state, { payload }: { payload: CalendarEvent[] }) => ({
      ...state,
      events: payload
    }),
    setActiveEvent: (state, { payload }: { payload: CalendarEvent | null }) => ({
      ...state,
      activeEvent: payload
    }),
    addNewEvent: (state, { payload }: { payload: CalendarEvent }) => ({
      ...state,
      events: [...state.events, payload],
      activeEvent: null
    }),
    updateEvent: (state, { payload }: { payload: CalendarEvent }) => ({
      ...state,
      events: state.events.map((event) => {
        if (event._id === payload._id) {
          return payload
        }
        return event
      }),
      activeEvent: null
    }),
    deleteEvent: (state, { payload }: { payload: string }) => ({
      ...state,
      events: state.events.filter((event) => event._id !== payload),
      activeEvent: null
    })
  }
})

export const { setLang, setEvents, setActiveEvent, addNewEvent, updateEvent, deleteEvent } = calendarSlice.actions