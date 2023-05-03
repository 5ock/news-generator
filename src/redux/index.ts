import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './global'

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store