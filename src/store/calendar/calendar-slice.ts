import { createSlice } from "@reduxjs/toolkit";
import { CalendarEvent, Langs } from "../../definitions";

export interface CalendarState {
  lang: Langs,
  events: CalendarEvent[],
  activeEvent: CalendarEvent | null
}

const initialState: CalendarState = {
  lang: Langs.en,
  events: [],
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
      activeEvent: null,
      events: [...payload]
    }),
    setActiveEvent: (state, { payload }: { payload: CalendarEvent | null }) => ({
      ...state,
      activeEvent: payload
    }),
    clearCalendarStore: () => initialState,
  }
})

export const { setLang, setEvents, setActiveEvent, clearCalendarStore } = calendarSlice.actions