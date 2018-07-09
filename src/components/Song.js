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

    div:first-child {
        margin-right: auto;
    }
    
    div:last-child {
        margin: 0em 1em 0em 1em;
        font-size: 1.2em;
        :hover {
            font-size: 1.4em;
            color: black;
        }
    }

    h3 {
        margin: 0px;
    }

    :hover {
        background-color: ${({theme}) => theme.secondary.med};
        font-size: 1.2em;
    }
`

export default ({song, artist, active, selectCurrent, removeCurrent, pauseCurrent}) => (
    <Song active={active} onClick={() => selectCurrent()}>
        <div>
            <h3>{song}</h3>
            {artist}
        </div>
        <div>
            {active ? 'playing' : 'stopped'}
        </div>
        <div onClick={e => {
            if (active) {
                pauseCurrent() 
            }
            removeCurrent() 
            e.stopPropagation()
        }}>
            X
        </div>
    </Song>
)