import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'
import socket from 'socket.io-client'
import { connect } from 'react-redux'

import SongList from './SongList'
import Playing from './Playing'
import Notification, { InnerNotification } from './Notification'
import { setMeta, queueSong } from '../actions'

/* Components  */

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

class Main extends Component {
    componentDidMount() {
        const { match, queueSong } = this.props
        const { code } = match.params
        // save log-in stage in localstorage so user can close window
        // set default expiry to 1 hour
        // const loggedIn = {
        //     loggedIn: true,
        //     expires: Date.now() + 3600000,
        // }
        // localStorage.setItem('loggedIn', JSON.stringify(loggedIn))

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
                <PoseGroup
                    animateOnMount
                    preEnterPose="beforeFade"
                    enterPose="fadeIn"
                    exitPose="fadeOut"
                >
                    {phase === 'one' && (
                        // react pose transition bug (?) requires markup to be
                        // defined this way
                        <Notification phase="one" key="one">
                            <InnerNotification phase="one" code={code} />
                        </Notification>
                    )}
                    {phase === 'two' && (
                        // as above
                        <Notification delay={2100} phase="two" key="two">
                            <InnerNotification phase="two" code={code} />
                        </Notification>
                    )}
                </PoseGroup>
                {phase === 'two' && (
                    <Fragment>
                        <SongList />
                        <Playing />
                    </Fragment>
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
    mapDispatchToProps,
)(Main)
