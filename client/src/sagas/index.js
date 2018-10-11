import { takeEvery } from 'redux-saga/effects'

import { TriggerActions } from '../actions/triggers'
import axios from 'axios'

function* playSongFromStartSaga(action) {
    try {
        yield axios.get(`/api/play/${action.id}/${action.uri}`)
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

function* playSongSaga(action) {
    try {
        yield axios.get('/api/play')
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

function* pauseSongSaga(action) {
    try {
        yield axios.get('/api/pause')
    } catch (e) {
        console.error(e)
        // TODO:
        // dispatch some sort of error action
    }
}

export default function* watcher() {
    yield takeEvery(
        TriggerActions.TRIGGER_PLAY_SONG_FROM_START,
        playSongFromStartSaga,
    )
    yield takeEvery(TriggerActions.TRIGGER_PLAY_SONG, playSongSaga)
    yield takeEvery(TriggerActions.TRIGGER_PAUSE_SONG, pauseSongSaga)
}
