import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  currentUser: object | null,
  loading: boolean,
  error: boolean
}

const initialState: CounterState = {
  currentUser: null,
  loading: false,
  error: false,}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<object>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
  }
  },
})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions

export default authSlice.reducer