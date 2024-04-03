import { configureStore } from "@reduxjs/toolkit";
import { AuthState, UiState, authSlice, uiSlice } from ".";
import { CalendarState, calendarSlice } from "./calendar/calendar-slice";

export interface AppStore {
  ui: UiState;
  calendar: CalendarState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})