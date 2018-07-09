import React from 'react'
import styled from 'styled-components'

const Song = styled.div`
    background-color: ${({theme, active}) => active ? 
        theme.secondary.med :
        theme.secondary.light};
    color: ${({theme, active}) => active ? 
        'black' :
        theme.primary.dark};
    font-size: ${({active}) => active && '1.2em'};
    padding: 0.3em;
    margin: 0.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;


    h3 {
        margin: 0px;
    }

    :hover {
        background-color: ${({theme}) => theme.secondary.med};
        font-size: 1.2em;
    }
`

export default ({song, artist, playing, active, togglePlayback, selectSong}) => (
    <Song active={active} onClick={() => selectSong()}>
        <div>
            <h3>{song}</h3>
            {artist}
        </div>
        <div onClick={() => {
            selectSong()
            togglePlayback()
        }}>
            {playing ? 'playing' : 'stopped'}
        </div>
    </Song>
)