import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'
import socket from 'socket.io-client'
import { connect } from 'react-redux'

import SongList from './SongList'
import Playing from './Playing'
import { Notification, CornerNotification } from './Notification'
import { setMeta, queueSong } from '../actions'
import { FadeInOut } from '../animations'

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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Main)
