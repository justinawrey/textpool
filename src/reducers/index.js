import { combineReducers } from 'redux'
import { SongActions } from '../actions'
import { initialSongs, initialMeta, initialActive } from './initial'

const songs = (state = initialSongs, action) => {
    switch (action.type) {
        case SongActions.QUEUE_SONG:
            return [...state, action.id]
        case SongActions.DEQUEUE_SONG:
            return state.slice(1)
        case SongActions.REMOVE_SONG:
            const removed = [...state]
            removed.splice(removed.indexOf(action.id), 1)
            return removed
        default:
            return state
    }
}

const meta = (state = initialMeta, action) => {
    switch (action.type) {
        case SongActions.PLAY_SONG:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    playing: true,
                },
            }
        case SongActions.PAUSE_SONG:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    playing: false,
                },
            }
        default:
            return state
    }
}

const active = (state = initialActive, action) => {
    switch (action.type) {
        case SongActions.SELECT_SONG:
            return action.id
        default:
            return state
    }
}

export default combineReducers({
    songs,
    meta,
    active,
})
