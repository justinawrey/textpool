import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import posed from 'react-pose'
import socket from 'socket.io-client'
import { connect } from 'react-redux'

import SongList from './SongList'
import Code from './Code'
import Playing from './Playing'
import { setMeta, queueSong } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* Animations */

const SlideFromLeft = posed.div({
    visible: {
        x: '0%',
        transition: {
            type: 'tween',
            ease: 'easeOut',
            duration: 400,
        },
    },
    one: {
        y: 20,
        opacity: 0,
    },
    oneAfter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1000,
        },
    },
    hidden: {
        x: '-100%',
    },
})

const FadeIn = posed.div({
    visible: {
        opacity: 1,
        y: 0,
        delay: 600,
        transition: {
            duration: 400,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})

const Notification = posed.div({
    beforeone: {
        opacity: 0,
        y: 20,
    },
    one: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1000,
        },
    },
})

/* Components - All purely for layout */

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

const PanelLeft = styled(SlideFromLeft)`
    flex: 1;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-right: ${({ theme }) => `${theme.baseMargin}px`};
    overflow: auto;
`

const PanelRight = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-left: ${({ theme }) => `${theme.baseMargin}px`};
`

const RightPanelTop = styled(FadeIn)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-bottom: ${({ theme }) => `${theme.baseMargin}px`};
`

const RightPanelBottom = styled(FadeIn)`
    flex: 5;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: ${({ theme }) => theme.primary.light};
    border-radius: ${({ theme }) => `${theme.baseRadius}px`};
    margin-top: ${({ theme }) => `${theme.baseMargin}px`};
`

const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`

const StyledNotification = styled(Notification)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
        background-color: ${({ theme }) => theme.secondary.light};
        border-radius: ${({ theme }) => `${theme.baseRadius}px`};
        box-shadow: ${({ theme }) =>
            `0px 0px 0px ${theme.baseRadius}px ${theme.secondary.dark}`};
        padding: ${({ theme }) => `${theme.baseMargin * 4}px`};
        font-size: 1em;
        transition: font-size 0.1s linear;

        :hover {
            animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
            font-size: 1.05em;
        }

        h1 {
            align-self: center;
            margin-top: ${({ theme }) => `${theme.baseMargin * 3}px`};
            text-align: center;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;

            p {
                margin: 0;
            }

            svg {
                margin-right: ${({ theme }) => `${theme.baseMargin * 4}px`};
            }
        }
    }
`

const Indented = styled.span`
    background-color: ${({ theme }) => theme.secondary.vdark};
    padding: ${({ theme }) => `${theme.baseMargin}px`};
    border-radius: ${({ theme }) => `${theme.baseRadius / 2}px`};
    color: black;
`

class Main extends Component {
    componentDidMount() {
        const { match, queueSong } = this.props
        const { code } = match.params
        // save log-in stage in localstorage so user can close window
        // set default expiry to 1 hour
        const loggedIn = {
            loggedIn: true,
            expires: Date.now() + 3600000,
        }
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn))

        // and then set up websocket
        const host = 'http://localhost:3001'
        this.socket = socket(host)
        this.socket.on('connect', () => console.log(`connected to ${host}`))
        this.socket.on(code, songData => queueSong(songData))
        this.socket.on('disconnect', () =>
            console.log(`disconnected from ${host}`),
        )
    }

    componentWillUnmount() {
        this.socket.close()
    }

    render() {
        const { match, phase } = this.props
        const { code } = match.params
        return (
            <Container>
                <PanelLeft>
                    <StyledNotification
                        initialPose={`before${phase}`}
                        pose={phase}
                    >
                        <div>
                            {phase !== 'two' && <h1>There's nothing here!</h1>}
                            <div>
                                <FontAwesomeIcon icon="mobile-alt" size="3x" />
                                <p>
                                    <i>
                                        Text{' '}
                                        <Indented>
                                            <strong
                                            >{`${code} <song> <artist>`}</strong>
                                        </Indented>{' '}
                                        to <strong>(778) 860-7371</strong>
                                    </i>
                                </p>
                            </div>
                        </div>
                    </StyledNotification>
                    {phase === 'two' && <SongList />}
                </PanelLeft>
                {phase !== 'one' && (
                    <PanelRight>
                        <RightPanelTop initialPose="hidden" pose="visible">
                            <Code code={code} />
                        </RightPanelTop>
                        <RightPanelBottom initialPose="hidden" pose="visible">
                            <Playing />
                        </RightPanelBottom>
                    </PanelRight>
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { songs, active } = state
    let phase
    if (songs.length <= 0) {
        phase = 'one'
    } else {
        phase = active === 0 ? 'two' : 'three'
    }

    return {
        phase,
    }
}

const mapDispatchToProps = dispatch => ({
    queueSong: ({ id, ...rest }) => {
        dispatch(setMeta(id, rest))
        dispatch(queueSong(id))
    },
})

export default connect(
    mapStateToProps,
    dispatch => ({
        queueSong: ({ id, ...rest }) => {
            dispatch(setMeta(id, rest))
            dispatch(queueSong(id))
        },
    }),
)(Main)
