// actions which are meant only to trigger sagas
// they all start with trigger... in order to make it
// clear that these actions trigger a saga which in turn
// triggers some sort of async action

export const TriggerActions = {
    TRIGGER_PLAY_SONG_FROM_START: 'TRIGGER_PLAY_SONG_FROM_START',
    TRIGGER_PLAY_SONG: 'TRIGGER_PLAY_SONG',
    TRIGGER_PAUSE_SONG: 'TRIGGER_PAUSE_SONG',
}

export const triggerPlaySongFromStart = (id, uri) => ({
    type: TriggerActions.TRIGGER_PLAY_SONG_FROM_START,
    id,
    uri,
})

export const triggerPlaySong = () => ({
    type: TriggerActions.TRIGGER_PLAY_SONG,
})

export const triggerPauseSong = () => ({
    type: TriggerActions.TRIGGER_PAUSE_SONG,
})
