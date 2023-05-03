import { createSlice } from '@reduxjs/toolkit'

import { INewsItem, initialNews, IContent,initialContent } from '../types/news'

interface IGlobalState {
    aNews: INewsItem;
    aContent: IContent;
}

const globalInitial:IGlobalState = {
    aNews: initialNews,
    aContent: initialContent
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalInitial,
    reducers: {
        setANews(state, action) {
            state.aNews = action.payload
        },
        setAContent(state, action) {
            state.aContent = action.payload
        },
        reset: () => globalInitial
    }
})


export const { 
    setANews,
    setAContent,
    reset
} = globalSlice.actions

export default globalSlice.reducer