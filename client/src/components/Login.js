import React, { Component } from 'react'
import posed from 'react-pose'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import Spinner from './Spinner'

const LoginAnimation = posed.a({
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1000,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
    },
})

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

export default class extends Component {
    constructor(props) {
        super(props)
        const loggedIn = localStorage.getItem('loggedIn') || false
        this.state = {
            fetching: loggedIn,
            code: null,
            loggedIn,
        }
    }

    componentDidMount() {
        const { fetching } = this.state

        if (fetching) {
            // fake spinner for 1 second
            setTimeout(async () => {
                let room
                try {
                    room = await axios.get('/api/room')
                } catch (e) {
                    console.error(e)
                    this.setState({ fetching: false })
                    return
                }
                this.setState({ fetching: false, code: room.data.room })
            }, 1000)
        }
    }

    render() {
        const { fetching, code, loggedIn } = this.state

        return (
            <LoginButton>
                {fetching ? (
                    <Spinner round />
                ) : loggedIn ? (
                    <Redirect to={`/room/${code}`} />
                ) : (
                    <LoginAnimation
                        initialPose="hidden"
                        pose="visible"
                        href="http://localhost:3001/api/login"
                    >
                        Login with Spotify
                    </LoginAnimation>
                )}
            </LoginButton>
        )
    }
}
