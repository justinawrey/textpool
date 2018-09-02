import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { selectSong, playSong, pauseSong, removeSong } from '../actions'
import { FadeIn } from '../animations'

/* Presentational Component */

const StyledSong = styled(FadeIn)`
    background-color: ${({ theme, active }) =>
        active ? theme.secondary.med : theme.secondary.light};
    color: ${({ theme, active }) => (active ? 'black' : theme.primary.light)};
    font-size: ${({ active }) => (active ? '1.1em' : '1em')};
    padding: 0.3em 0.3em 0.3em 1em;
    margin: ${({ theme }) => `${theme.baseMargin}px`};
    border-radius: ${({ theme }) => `${theme.baseRadius / 2}px`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: font-size 0.1s ease-in;

    div:first-child {
        margin-right: auto;
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    svg:last-child {
        margin: -1.6em -0.1em 0em 1em;
        transition: color 0.2s ease-in;
        display: none;

        &:hover {
            color: red;
        }
    }

    &:hover svg:last-child {
        display: block;
    }

    &:hover {
        background-color: ${({ theme }) => theme.secondary.med};
        font-size: 1.1em;
        color: black;
    }
`
const Song = ({ song, artist, active, selectCurrent, removeCurrent }) => (
    <StyledSong
        active={active}
        onClick={() => selectCurrent()}
        initialPose="hidden"
        pose="visible"
        duration={1000}
    >
        <div>
            {song}
            <br />
            <strong>{artist}</strong>
        </div>
        <FontAwesomeIcon
            onClick={e => {
                removeCurrent()
                e.stopPropagation()
            }}
            size="xs"
            icon="times"
        />
    </StyledSong>
)

/* Container logic */

const mapStateToProps = (state, ownProps) => {
    const { song, artist, spinIn } = state.meta[ownProps.id]
    return {
        active: ownProps.id === state.active,
        song,
        artist,
        spinIn: spinIn,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectCurrent: () => {
        dispatch(selectSong(ownProps.id))
        dispatch(playSong(ownProps.id))
    },
    removeCurrent: () => dispatch(removeSong(ownProps.id)),
    pauseCurrent: () => dispatch(pauseSong(ownProps.id)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    removeCurrent: () => {
        if (stateProps.active) {
            dispatchProps.pauseCurrent()
        }
        dispatchProps.removeCurrent()
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Song)
