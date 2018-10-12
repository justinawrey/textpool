import axios from 'axios'
import { takeEvery, apply, put, all, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
    startFetchingInitialData,
    stopFetchingInitialData,
    setAllMeta,
    setSongList,
    setRoom,
} from '../actions'
import { TriggerActions } from '../actions/triggers'

function* playSongFromStartSaga(action) {
    try {
        yield apply(axios, 'get', [`/api/play/${action.id}/${action.uri}`])
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

function* playSongSaga() {
    try {
        yield apply(axios, 'get', ['/api/play'])
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

function* pauseSongSaga() {
    try {
        yield apply(axios, 'get', ['/api/pause'])
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

function* checkLoginSaga() {
    let room
    try {
        room = yield apply(axios, 'get', ['/api/room'])
    } catch (e) {
        // we are not logged in
        // TODO: differentiate between other errors
        console.error(e)
        return
    }

    // we are logged in.  Populate any initial song data.
    // starts the login spinner
    yield put(startFetchingInitialData())
    let songs, meta
    try {
        ;[songs, meta] = yield all([
            apply(axios, 'get', ['/api/songs']),
            apply(axios, 'get', ['/api/meta']),
            // introduce a minimum load time of 1 seconds.
            // if data loads too fast the flashing spinner is jarring.
            call(delay, 1000),
        ])
    } catch (e) {
        // TODO:
        // dispatch some sort of error action
        console.error(e)
        yield put(stopFetchingInitialData())
        return
    }

    yield put(setAllMeta(meta.data.meta))
    yield put(setSongList(songs.data.songs))
    yield put(setRoom(room.data.room))
    yield put(stopFetchingInitialData())
}

export default function* watcher() {
    yield takeEvery(
        TriggerActions.TRIGGER_PLAY_SONG_FROM_START,
        playSongFromStartSaga,
    )
    yield takeEvery(TriggerActions.TRIGGER_PLAY_SONG, playSongSaga)
    yield takeEvery(TriggerActions.TRIGGER_PAUSE_SONG, pauseSongSaga)
    yield takeEvery(TriggerActions.TRIGGER_CHECK_LOGIN, checkLoginSaga)
}
