import { createSlice } from "@reduxjs/toolkit"

export interface UiState {
  isModalOpen: boolean
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    openModal: (state) => ({
      ...state,
      isModalOpen: true
    }),
    closeModal: (state) => ({
      ...state,
      isModalOpen: false
    })
  }
})

export const { openModal, closeModal } = uiSlice.actions