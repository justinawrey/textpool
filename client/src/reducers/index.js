import { combineReducers } from 'redux'
import { SongActions, MetaActions } from '../actions'

const songs = (state = [], action) => {
    switch (action.type) {
        case SongActions.QUEUE_SONG:
            return [...state, action.id]
        case SongActions.DEQUEUE_SONG:
            return state.slice(1)
        case SongActions.REMOVE_SONG:
            const removed = [...state]
            removed.splice(removed.indexOf(action.id), 1)
            return removed
        case SongActions.SET_SONG_LIST:
            return action.songs
        default:
            return state
    }
}

// object of song metadata by id
const meta = (state = {}, action) => {
    switch (action.type) {
        case MetaActions.SET_ALL_META:
            return Object.keys(action.allMeta).reduce((res, key) => {
                res[key] = { ...action.allMeta[key], spinIn: false }
                return res
            }, {})
        case MetaActions.SET_META:
            const newMeta = { ...state }
            newMeta[action.id] = action.meta
            return newMeta
        default:
            return state
    }
}

// current active song by id
const active = (state = 0, action) => {
    switch (action.type) {
        case SongActions.SELECT_SONG:
            return action.id
        default:
            return state
    }
}

// whether or not current song is playing -> bool
const playing = (state = false, action) => {
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
