import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import SongContainer from '../containers/SongContainer'

const StyledSongList = styled.div`
    margin: 0 15% 0 15%;
    padding-right: 5px;
    max-height: 600px;
    overflow: auto;
    position: relative;

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: ${({ theme }) => theme.primary.light};
    }

    > div {
        border-width: 0.2em 0.4em 0.2em 0.4em;
        border-style: solid;
        border-color: ${({ theme }) => theme.secondary.dark};
    }

    > div:first-child {
        border-top-width: 0.4em;
    }

    > div:last-child {
        border-bottom-width: 0.4em;
    }
`

const SongList = ({ songs }) =>
    songs.length > 0 ? (
        <StyledSongList>
            {songs.map(id => <SongContainer key={id} id={id} />)}
        </StyledSongList>
    ) : (
        <Spinner />
    )

export default connect(state => ({ songs: state.songs }))(SongList)
