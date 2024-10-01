import { configureStore } from '@reduxjs/toolkit'
 import { apiSlice } from '../Features/apislice'
import userReducer from '../Features/userslice'
 export const store = configureStore({
  reducer: {
    user: userReducer,  
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
})