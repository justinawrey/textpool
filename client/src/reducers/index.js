import { combineReducers } from 'redux'
import {
    SongActions,
    MetaActions,
    BlacklistActions,
    WhitelistActions,
    RoomActions,
    FetchActions,
} from '../actions'

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
// TODO: fix this
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

// the current room code for this session
const room = (state = '', action) => {
    switch (action.type) {
        case RoomActions.SET_ROOM:
            return action.room
        default:
            return state
    }
}

// phone numbers in the blacklist
const blackList = (state = [], action) => {
    switch (action.type) {
        case BlacklistActions.SET_ALL_BLACKLIST:
            return action.numbers
        case BlacklistActions.ADD_TO_BLACKLIST:
            return [...state, action.number]
        case BlacklistActions.REMOVE_FROM_BLACKLIST:
            const removed = [...state]
            removed.splice(removed.indexOf(action.number), 1)
            return removed
        default:
            return state
    }
}

// phone numbers in the whitelist
const whiteList = (state = [], action) => {
    switch (action.type) {
        case WhitelistActions.SET_ALL_WHITELIST:
            return action.numbers
        case WhitelistActions.ADD_TO_WHITELIST:
            return [...state, action.number]
        case WhitelistActions.REMOVE_FROM_WHITELIST:
            const removed = [...state]
            removed.splice(removed.indexOf(action.number), 1)
            return removed
        default:
            return state
    }
}

// whether or not the app is currently fetching initial data
// i.e. populating songs, meta, after a login attempt
const fetchingInitialData = (state = false, action) => {
    switch (action.type) {
        case FetchActions.FETCH_START:
            return true
        case FetchActions.FETCH_STOP:
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
    blackList,
    whiteList,
    room,
    fetchingInitialData,
})
