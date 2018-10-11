import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'
import socket from 'socket.io-client'
import { connect } from 'react-redux'

import SongList from './SongList'
import Playing from './Playing'
import { Notification, CornerNotification } from './Notification'
import { setMeta, queueSong, selectSong, playSong } from '../actions'
import { FadeInOut } from '../animations'
import config from '../config'

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
        const { match, queueSong, selectAndPlaySong } = this.props
        const { code } = match.params
        const host = config.serverOrigin
        this.socket = socket(host)
        this.socket.on('connect', () => console.log(`connected to ${host}`))

        // listen for requests to queue up songs from sms -> server -> client
        this.socket.on(code, songData => queueSong(songData))

        // listen for requests to set the active song from server -> client
        this.socket.on(`${code}-setactive`, id => selectAndPlaySong(id))

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
                        <FadeInOut>
                            <Notification code={code} key="one" />
                        </FadeInOut>
                    )}
                </PoseGroup>
                {phase === 'two' && (
                    <Fragment>
                        <SongList />
                        <Playing />
                        <CornerNotification code={code} />
                    </Fragment>
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { songs } = state
    const phase = songs.length <= 0 ? 'one' : 'two'

    return {
        phase,
    }
}

const mapDispatchToProps = dispatch => ({
    queueSong: ({ id, ...rest }) => {
        dispatch(setMeta(id, rest))
        dispatch(queueSong(id))
    },
    selectAndPlaySong: id => {
        dispatch(selectSong(id))
        dispatch(playSong())
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main)
