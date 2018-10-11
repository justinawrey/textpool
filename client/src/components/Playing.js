import React from 'react'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FadeIn } from '../animations'
import { playSong, pauseSong, selectSong } from '../actions'
import {
    triggerPauseSong,
    triggerPlaySong,
    triggerPlaySongFromStart,
} from '../actions/triggers'

const StyledPlaying = styled(FadeIn)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin: ${({ theme }) => `${theme.baseMargin}px`};

    & > div:first-child {
        flex-basis: 65%;
        display: flex;
    }

    & > div:last-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        flex-basis: 35%;
        margin-top: 2rem;

        p:first-child {
            margin: 0rem 0rem 0.5rem 0rem;
        }
        p:nth-child(2) {
            margin: 0rem 0rem 1rem 0rem;
        }
        div {
            display: flex;
            align-items: center;

            svg {
                margin: 0rem 3rem 0rem 3rem;
                transition: color 0.2s ease-in;
                color: ${({ theme }) => theme.secondary.dark};
            }

            svg:hover {
                color: ${({ theme }) => theme.secondary.light};
            }
        }
    }
`

const Album = styled.div`
    ${({ img }) =>
        img
            ? css`
                  background: ${({ img }) => `url(${img}) no-repeat center`};
                  background-size: contain;
              `
            : css`
                  background-color: ${({ theme }) => theme.secondary.med};
              `}
    border-radius: ${({ theme }) => `${theme.baseRadius / 2}px`};
    align-self: flex-end;
    transition: height 0.05s linear, width 0.05s linear,
        box-shadow 0.05s ease-in;
    ${({ playing }) =>
        playing
            ? css`
                  height: 300px;
                  width: 300px;
                  box-shadow: 0rem 0rem 2rem 1rem rgba(0, 0, 0, 0.3);
              `
            : css`
                  height: 325px;
                  width: 325px;
                  box-shadow: 0rem 0rem 3rem 1rem rgba(0, 0, 0, 0.2);
              `};
`

const Playing = ({
    play,
    pause,
    previous,
    next,
    song,
    artist,
    album,
    artUrl,
    playing,
}) => (
    <StyledPlaying
        initialPose="hidden"
        pose="visible"
        duration={750}
        delay={1750}
    >
        <div>
            <Album playing={playing} img={artUrl} />
        </div>
        <div>
            <p>
                <strong>{song}</strong>
            </p>
            <p>
                {artist} --- {album}
            </p>
            <div>
                <FontAwesomeIcon
                    size="3x"
                    icon="backward"
                    onClick={() => previous()}
                />
                <FontAwesomeIcon
                    size="5x"
                    icon={playing ? 'pause-circle' : 'play-circle'}
                    onClick={() => {
                        playing ? pause() : play()
                    }}
                />
                <FontAwesomeIcon
                    size="3x"
                    icon="forward"
                    onClick={() => next()}
                />
            </div>
        </div>
    </StyledPlaying>
)

const mapStateToProps = state => {
    const { meta, active, playing, songs } = state
    let song, artist, album, artUrl
    if (active) {
        ;({ song, artist, album, artUrl } = meta[active])
    } else {
        song = '/'
        artist = '/'
        album = '/'
        artUrl = false
    }
    return {
        song,
        artist,
        album,
        artUrl,
        playing,

        // for mergeProps
        active,
        songs,
        meta,
    }
}

const mapDispatchToProps = dispatch => ({
    play: () => {
        dispatch(playSong())
        dispatch(triggerPlaySong())
    },
    pause: () => {
        dispatch(pauseSong())
        dispatch(triggerPauseSong())
    },
    playSongFromStart: (id, uri) => {
        dispatch(triggerPlaySongFromStart(id, uri))
        dispatch(playSong())
    },
    previous: prevSong => dispatch(selectSong(prevSong)),
    next: nextSong => dispatch(selectSong(nextSong)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    previous: () => {
        const { active, songs } = stateProps
        if (active) {
            const idx = songs.indexOf(active)
            const prevSong =
                idx === 0 ? songs[songs.length - 1] : songs[idx - 1]
            const { uri } = stateProps.meta[prevSong]
            dispatchProps.previous(prevSong)
            dispatchProps.playSongFromStart(prevSong, uri)
        }
    },
    next: () => {
        const { active, songs } = stateProps
        if (active) {
            const idx = songs.indexOf(active)
            const nextSong =
                idx === songs.length - 1 ? songs[0] : songs[idx + 1]
            const { uri } = stateProps.meta[nextSong]
            dispatchProps.next(nextSong)
            dispatchProps.playSongFromStart(nextSong, uri)
        }
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(Playing)
