import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './slices/layout.slice'
import authReducer from './slices/auth.slice'
import { userReducer } from './slices/user.slice'
import { roleReducer } from './slices/team.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    layout: layoutReducer,
    user: userReducer,
    role: roleReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
