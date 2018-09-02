import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Song from './Song'
import { SlideFromLeft } from '../animations'

const StyledList = styled(SlideFromLeft)`
    padding: ${({ theme }) => `${theme.baseMargin2}px`};
    background-color: ${({ theme }) => theme.primary.light};
    margin: ${({ theme }) => `${theme.baseMargin}px`};
    padding: ${({ theme }) => `${theme.baseMargin}px`};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    height: 100%;
    flex: 1;
`

const SongList = ({ songs, oneSong }) => (
    <StyledList initialPose="hidden" pose="visible">
        {songs.map(id => (
            <Song key={id} id={id} />
        ))}
    </StyledList>
)

export default connect(state => ({
    songs: state.songs,
    oneSong: state.songs.length === 1,
}))(SongList)
