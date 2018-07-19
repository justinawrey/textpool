import React from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import SongContainer from "../containers/SongContainer";

const StyledSongList = styled.ul`
    padding: 0.1em 0em 0.1em 0em;
    background-color: ${({ theme }) => theme.secondary.dark};
`;

const pulse = keyframes`
    0% {font-size: 1em;}
    50% {font-size: 1.2em;}
    100% {font-size: 1em;}
`;

const NoSongs = styled.div`
    text-align: center;
    background-color: ${({ theme }) => theme.secondary.dark};
    animation: ${pulse} 3s ease-in-out infinite;
`;

const SongList = ({ songs }) =>
    songs.length > 0 ? (
        <StyledSongList>
            {songs.map(id => <SongContainer key={id} id={id} />)}
        </StyledSongList>
    ) : (
        <NoSongs>
            <h1>awww shit... there's nothing here!</h1>
            waiting for new songs to be queued...
        </NoSongs>
    );

export default connect(state => ({ songs: state.songs }))(SongList);
