import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'

export default {
    songs: [
        '07160a64-26fb-4994-924d-b338e3756563',
        '1ae5bc0e-23ca-4a09-8cbf-23fe33749f1b',
        '603e3469-ec9e-4527-b69f-3645ade52499',
    ],
    meta: {
        '07160a64-26fb-4994-924d-b338e3756563': {
            song: 'I Miss You',
            artist: 'blink-182',
            album: 'blink-182',
            uri: 'spotify:track:1oTo3ijRbaDAtrjJrGAPSw',
            from: '+16048457579',
        },
        '1ae5bc0e-23ca-4a09-8cbf-23fe33749f1b': {
            song: 'Something Good',
            artist: 'alt-J',
            album: 'An Awesome Wave',
            uri: 'spotify:track:3xqxETvPg43KWP0HOGiOmu',
            from: '+16048457579',
        },
        '603e3469-ec9e-4527-b69f-3645ade52499': {
            song: 'A$AP Forever',
            artist: 'A$AP Rocky',
            album: 'A$AP Forever',
            uri: 'spotify:track:1YmF9PvLhIISIANoMLIYGq',
            from: '+16048457579',
        },
    },
    active: 0,
    playing: false,
}

export const createInitialStore = initialState =>
    createStore(rootReducer, initialState, applyMiddleware(createLogger()))
