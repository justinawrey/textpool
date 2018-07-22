import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const fadeTo = color => keyframes`
    to { color: ${color}};
`

const growTo = size => keyframes`
    to { font-size: ${size}};
`

const Song = styled.div`
    background-color: ${({ theme, active }) =>
        active ? theme.secondary.med : theme.secondary.light};
    color: ${({ theme, active }) => (active ? 'black' : theme.primary.dark)};
    font-size: ${({ active }) => active && '1.2em'};
    padding: 0.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div:first-child {
        margin-right: auto;
    }

    svg:nth-child(2) {
        &:hover {
            animation: ${fadeTo('darkgreen')} 0.3s ease-in forwards;
        }
    }

    div:last-child {
        margin: 0em 1em 0em 1em;
        &:hover {
            animation: ${fadeTo('red')} 0.3s ease-in forwards;
        }
    }

    h3 {
        margin: 0px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.secondary.med};
        animation: ${growTo('1.2em')} 0.1s ease-in forwards;
    }
`

export default ({
    song,
    artist,
    active,
    playing,
    selectCurrent,
    removeCurrent,
    pauseCurrent,
}) => (
    <Song active={active} onClick={() => selectCurrent()}>
        <div>
            <h3>{song}</h3>
            {artist}
        </div>
        {playing ? (
            <FontAwesomeIcon
                icon="pause"
                onClick={e => {
                    pauseCurrent()
                    e.stopPropagation()
                }}
            />
        ) : (
            <FontAwesomeIcon icon="play" onClick={() => selectCurrent()} />
        )}
        <div
            onClick={e => {
                if (active) {
                    pauseCurrent()
                }
                removeCurrent()
                e.stopPropagation()
            }}
        >
            <FontAwesomeIcon size="lg" icon="times" />
        </div>
    </Song>
)
