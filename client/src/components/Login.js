import React, { Component } from 'react'
import styled from 'styled-components'
import { PoseGroup } from 'react-pose'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from './Spinner'
import { FadeInOut } from '../animations'
import config from '../config'
import { triggerCheckLogin } from '../actions/triggers'

const LoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    a {
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.secondary.light};
        padding: 0.2em;
        border-radius: 0.8em;
        border: 0.2em solid ${({ theme }) => theme.secondary.dark};
        color: ${({ theme }) => theme.primary.light};
        font-size: 2em;
        text-decoration: none;
        font-weight: bold;
        transition: font-size 0.1s ease-in, color 0.1s ease-in;

        :hover {
            font-size: 2.2em;
            color: black;
            cursor: grab;
        }
    }
`

class Login extends Component {
    constructor(props) {
        super(props)
        this.props.checkLogin()
    }

    render() {
        const { room, fetchingInitialData } = this.props
        return (
            <LoginButton>
                <PoseGroup
                    animateOnMount
                    preEnterPose="beforeFade"
                    enterPose="fadeIn"
                    exitPose="fadeOut"
                >
                    {fetchingInitialData ? (
                        <FadeInOut>
                            <Spinner round />
                        </FadeInOut>
                    ) : room ? (
                        <Redirect to={`/room/${room}`} />
                    ) : (
                        <FadeInOut>
                            <a href={`${config.serverOrigin}/api/login`}>
                                Login with Spotify
                            </a>
                        </FadeInOut>
                    )}
                </PoseGroup>
            </LoginButton>
        )
    }
}

export default connect(
    state => {
        const { room, fetchingInitialData } = state
        return {
            room,
            fetchingInitialData,
        }
    },
    dispatch => ({
        checkLogin: () => dispatch(triggerCheckLogin()),
    }),
)(Login)
