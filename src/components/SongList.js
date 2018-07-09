import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SongContainer from '../containers/SongContainer'

const StyledSongList = styled.ul`
    padding: 0.1em 0em 0.1em 0em;
    background-color: ${({theme}) => theme.secondary.dark};
`

const SongList = ({songs, handleClick}) => (
    <StyledSongList>
        {songs.map(id => <SongContainer key={id} id={id}/>)}
    </StyledSongList>
)

export default connect(state => ({songs: state.songs}))(SongList)


    