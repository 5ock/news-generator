import { createSlice } from '@reduxjs/toolkit'

import { INewsItem, initialNews, IContent,initialContent } from '../types/news'

interface IGlobalState {
    mode: string; // aNews, allNews
    aNews: INewsItem;
    aContent: IContent;
    importFiles: INewsItem[];
}

const globalInitial:IGlobalState = {
    mode: '',
    aNews: initialNews,
    aContent: initialContent,
    importFiles: []
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalInitial,
    reducers: {
        setMode(state, action) {
            state.mode = action.payload
        },
        setANews(state, action) {
            state.aNews = action.payload
        },
        setAContent(state, action) {
            state.aContent = action.payload
        },
        setImportFiles(state, action) {
            state.importFiles = action.payload
        },
        reset: () => globalInitial
    }
})


export const { 
    setMode,
    setANews,
    setAContent,
    setImportFiles,
    reset
} = globalSlice.actions

export default globalSlice.reducer