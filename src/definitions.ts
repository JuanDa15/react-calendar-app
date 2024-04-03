export interface CalendarEvent {
  _id?: string,
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor: string,
  user: {
    _id: string,
    name: string,
  }
}

export interface User {
  _id: string,
  name: string,
  email: string,
}

export interface Action<T> {
  type: 'string',
  payload: T
}

export enum Langs {
  'en' = 'en-US',
  'es' = 'es-ES',
}

export interface ServerResponse<T = unknown> {
  ok: boolean,
  data?: T,
  message: string
}

export interface LoginResponse extends User {
  token: string
}