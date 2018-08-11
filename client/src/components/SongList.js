import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import Song from './Song'

const SlideInList = posed.div({
    visible: {
        delayChildren: 200,
        staggerChildren: 50,
    },
})

const StyledList = styled(SlideInList)`
    padding: ${({ theme }) => `${theme.baseMargin}px`};
`

const SongList = ({ songs }) =>
    songs.length > 0 ? (
        <StyledList>{songs.map(id => <Song key={id} id={id} />)}</StyledList>
    ) : (
        <Spinner />
    )

export default connect(state => ({ songs: state.songs }))(SongList)
