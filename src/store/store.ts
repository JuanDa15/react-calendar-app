import { configureStore } from "@reduxjs/toolkit";
import { UiState, uiSlice } from ".";
import { CalendarState, calendarSlice } from "./calendar/calendar-slice";

export interface AppStore {
  ui: UiState;
  calendar: CalendarState;
}

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})