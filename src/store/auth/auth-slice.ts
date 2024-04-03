import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../definitions";

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: null | User,
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: 'not-authenticated',
  user: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = null;
    },
    onAuthError: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = null;
      state.errorMessage = payload;
    }
  }
})

export const { onChecking, onLogin, onLogout, onAuthError } = authSlice.actions