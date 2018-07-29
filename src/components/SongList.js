import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import Song from './Song'

const SlideInList = posed.div({
    visible: {
        x: '0%',
        delayChildren: 200,
        staggerChildren: 50,
    },
    hidden: {
        x: '-100%',
    },
})

const StyledSongList = styled(SlideInList)`
    margin: 0 15% 0 15%;
    padding-top: 0.1em;
    padding-bottom: 0.1em;
    border-radius: 0.3em;
    background-color: ${({ theme }) => theme.primary.light};
`

const SongList = ({ songs }) =>
    songs.length > 0 ? (
        <StyledSongList initialPose="hidden" pose="visible">
            {songs.map(id => <Song key={id} id={id} />)}
        </StyledSongList>
    ) : (
        <Spinner />
    )

export default connect(state => ({ songs: state.songs }))(SongList)
