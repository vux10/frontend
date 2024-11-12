import { configureStore } from '@reduxjs/toolkit'

import { cartReducer } from './slide/cartSlice'
import { notificationReducer } from './slide/notificationSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,  // Disables serializable check if needed
    thunk: true  // Enables redux-thunk by default
  })
})
