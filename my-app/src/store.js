import { configureStore } from '@reduxjs/toolkit'
import topReducer from './topSlice'

export default configureStore({
  reducer: {
    top: topReducer
  }
})