/* song actions */
export const SongActions = {
    QUEUE_SONG: 'QUEUE_SONG',
    DEQUEUE_SONG: 'DEQUEUE_SONG',
    REMOVE_SONG: 'REMOVE_SONG',
    SELECT_SONG: 'SELECT_SONG',
    PLAY_SONG: 'PLAY_SONG',
    PAUSE_SONG: 'PAUSE_SONG',
    SET_SONG_LIST: 'SONGS',
}

// add song to back of queue
export const queueSong = id => ({
    type: SongActions.QUEUE_SONG,
    id,
})

// remove song from front of queue
export const dequeueSong = () => ({
    type: SongActions.DEQUEUE_SONG,
})

export const removeSong = id => ({
    type: SongActions.REMOVE_SONG,
    id,
})

// select a song as active
export const selectSong = id => ({
    type: SongActions.SELECT_SONG,
    id,
})

// play song
export const playSong = id => ({
    type: SongActions.PLAY_SONG,
    id,
})

//  pause song
export const pauseSong = id => ({
    type: SongActions.PAUSE_SONG,
    id,
})

// set the entire song list
export const setSongList = songs => ({
    type: SongActions.SET_SONG_LIST,
    songs,
})

export const MetaActions = {
    SET_ALL_META: 'SET_ALL_META',
    SET_META: 'SET_META',
}

// set the entire song meta
export const setAllMeta = allMeta => ({
    type: MetaActions.SET_ALL_META,
    allMeta,
})

// set a single song meta
export const setMeta = (id, meta) => ({
    type: MetaActions.SET_META,
    id,
    meta,
})
