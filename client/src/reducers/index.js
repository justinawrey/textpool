import { combineReducers } from 'redux'
import { SongActions } from '../actions'
import {
    initialSongs,
    initialMeta,
    initialActive,
    initialPlaying,
} from './initial'

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

// object of song metadata by id
const meta = (state = initialMeta, action) => {
    switch (action.type) {
        default:
            return state
    }
}

// current active song by id
const active = (state = initialActive, action) => {
    switch (action.type) {
        case SongActions.SELECT_SONG:
            return action.id
        default:
            return state
    }
}

// whether or not current song is playing -> bool
const playing = (state = initialPlaying, action) => {
    switch (action.type) {
        case SongActions.PLAY_SONG:
            return true
        case SongActions.PAUSE_SONG:
            return false
        default:
            return state
    }
}

export default combineReducers({
    songs,
    meta,
    active,
    playing,
})
