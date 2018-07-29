import React from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectSong, playSong, pauseSong, removeSong } from '../actions'

/* Presentational Component */

const fadeTo = color => keyframes`
    to { color: ${color}};
`

const growTo = size => keyframes`
    to { font-size: ${size}};
`

const SlideIn = posed.div({
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})

const StyledSong = styled(SlideIn)`
    background-color: ${({ theme, active }) =>
        active ? theme.secondary.med : theme.secondary.light};
    color: ${({ theme, active }) => (active ? 'black' : theme.primary.dark)};
    font-size: ${({ active }) => active && '1.2em'};
    padding: 0.3em 0.3em 0.3em 1em;
    margin: 0.5em;
    border-radius: 0.3em;
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
        margin: 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.secondary.med};
        animation: ${growTo('1.2em')} 0.1s ease-in forwards;
    }
`

const Song = ({
    song,
    artist,
    active,
    playing,
    selectCurrent,
    removeCurrent,
    pauseCurrent,
}) => (
    <StyledSong
        active={active}
        onClick={() => selectCurrent()}
        initialPose="hidden"
    >
        <div>
            <h3>{song}</h3>
            {artist}
        </div>
        {active &&
            (playing ? (
                <FontAwesomeIcon
                    icon="pause"
                    onClick={e => {
                        pauseCurrent()
                        e.stopPropagation()
                    }}
                />
            ) : (
                <FontAwesomeIcon icon="play" onClick={() => selectCurrent()} />
            ))}
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
    </StyledSong>
)

/* Container logic */

const mapStateToProps = (state, ownProps) => {
    const { song, artist, playing } = state.meta[ownProps.id]
    const songs = state.songs
    return {
        active: ownProps.id === state.active,
        playing,
        songs,
        song,
        artist,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectCurrent: () => {
        dispatch(selectSong(ownProps.id))
        dispatch(playSong(ownProps.id))
    },
    removeCurrent: () => dispatch(removeSong(ownProps.id)),
    pauseCurrent: () => dispatch(pauseSong(ownProps.id)),
    pauseSong: id => dispatch(pauseSong(id)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    selectCurrent: () => {
        stateProps.songs.forEach(id => dispatchProps.pauseSong(id))
        dispatchProps.selectCurrent()
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Song)
