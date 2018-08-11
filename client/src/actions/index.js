export const SongActions = {
    QUEUE_SONG: 'QUEUE_SONG',
    DEQUEUE_SONG: 'DEQUEUE_SONG',
    REMOVE_SONG: 'REMOVE_SONG',
    SELECT_SONG: 'SELECT_SONG',
    PLAY_SONG: 'PLAY_SONG',
    PAUSE_SONG: 'PAUSE_SONG'
}

// add song to back of queue
export const queueSong = id => ({
    type: SongActions.QUEUE_SONG,
    id 
})

// remove song from front of queue
export const dequeueSong = () => ({
    type: SongActions.DEQUEUE_SONG
})

export const removeSong = id => ({
    type: SongActions.REMOVE_SONG,
    id
})

// select a song as active
export const selectSong = id => ({
    type: SongActions.SELECT_SONG,
    id
})

// play song
export const playSong = id => ({
    type: SongActions.PLAY_SONG,
    id
})

//  pause song
export const pauseSong = id => ({
    type: SongActions.PAUSE_SONG,
    id
})
